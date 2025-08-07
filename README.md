# 🚀 Complete Deployment Guide: Calico Cat Monorepo

This guide walks you through deploying your React frontend to AWS Amplify and your FastAPI backend to AWS Lambda + API Gateway from a single monorepo.

## 📋 Prerequisites

Before you begin, ensure you have:

- **AWS Account** with appropriate permissions
- **GitHub Account** for repository hosting
- **Node.js 18+** and npm installed locally
- **Python 3.11+** installed locally
- **AWS CLI** configured with your credentials
- **AWS SAM CLI** installed for backend deployment

## 🏗️ Repository Setup

### 1. Create Your GitHub Repository

```bash
# Clone or create a new repository
git clone <your-repo-url>
cd your-repo-name

# Copy all the monorepo files from the generated structure
# (Use the files from the CSV export)

# Initial commit
git add .
git commit -m "Initial commit: Calico Cat monorepo setup"
git push origin main
```

### 2. Set Up Environment Variables

Create these files locally (don't commit them):

**frontend/.env**
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

**frontend/.env.production**
```
REACT_APP_API_BASE_URL=https://YOUR_API_GATEWAY_URL.amazonaws.com/prod
```

## 🔧 Local Development Setup

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# App will be available at http://localhost:3000
```

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn main:app --reload
# API will be available at http://localhost:8000
# API docs at http://localhost:8000/docs
```

## ☁️ AWS Deployment

### Step 1: Deploy Backend (FastAPI to Lambda)

#### Option A: Manual Deployment with SAM

```bash
cd backend

# Build the application
sam build

# Deploy (first time - guided)
sam deploy --guided

# Follow the prompts:
# - Stack Name: calico-cat-api
# - AWS Region: us-east-1 (or your preferred region)
# - Confirm changes before deploy: Y
# - Allow SAM CLI to create IAM roles: Y
# - Save parameters to samconfig.toml: Y

# For subsequent deployments:
sam deploy
```

#### Option B: Automated Deployment with GitHub Actions

1. **Configure GitHub Secrets:**
   - Go to your repository Settings → Secrets and variables → Actions
   - Add these secrets:
     - `AWS_ACCESS_KEY_ID`: Your AWS access key
     - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

2. **Trigger Deployment:**
   - Push changes to the `backend/` folder
   - GitHub Actions will automatically deploy to Lambda

3. **Get Your API URL:**
   - Check the GitHub Actions output
   - Or run: `aws cloudformation describe-stacks --stack-name calico-cat-api --query "Stacks[0].Outputs[?OutputKey=='CalicoApiUrl'].OutputValue" --output text`

### Step 2: Deploy Frontend (React to Amplify)

#### Manual Setup in AWS Console

1. **Navigate to AWS Amplify Console**
   - Go to https://console.aws.amazon.com/amplify/
   - Click "Create new app" → "Host web app"

2. **Connect to GitHub**
   - Choose GitHub as your source
   - Authorize AWS Amplify to access your repositories
   - Select your monorepo

3. **Configure Build Settings**
   - **App name:** `calico-cat-frontend`
   - **Repository:** Your repository name
   - **Branch:** `main`
   - **App root directory:** `frontend`
   - Amplify will auto-detect the build settings from `amplify.yml`

4. **Environment Variables (Important!)**
   - Go to App settings → Environment variables
   - Add: `REACT_APP_API_BASE_URL` = `https://YOUR_API_GATEWAY_URL.amazonaws.com/prod`
   - Replace `YOUR_API_GATEWAY_URL` with your actual API Gateway URL from Step 1

5. **Deploy**
   - Click "Save and deploy"
   - Wait for the deployment to complete (~5 minutes)
   - Your app will be available at the provided Amplify URL

#### Automated Deployment

- Amplify automatically redeploys when you push to the `main` branch
- Changes to `frontend/` folder trigger frontend rebuilds
- The GitHub Actions workflow provides build status

## 🔗 Connecting Frontend to Backend

### Update API URL

After backend deployment, update your frontend environment variables:

1. **Get your API Gateway URL** (from AWS CloudFormation outputs)
2. **Update Amplify Environment Variables:**
   - Amplify Console → App settings → Environment variables
   - Set `REACT_APP_API_BASE_URL` to your API Gateway URL
3. **Redeploy frontend** (Amplify will auto-redeploy)

### Test the Connection

Visit your Amplify app URL and verify:
- ✅ Homepage loads correctly
- ✅ Facts section shows data from API
- ✅ Breeds section displays breed information
- ✅ Gallery section shows pattern types
- ✅ No console errors

## 🔄 CI/CD Pipeline

Your monorepo includes automated CI/CD:

### Backend Pipeline (GitHub Actions)
- **Trigger:** Changes to `backend/` folder
- **Process:** Test → Build → Deploy to Lambda
- **Output:** Updated API Gateway endpoint

### Frontend Pipeline (AWS Amplify)
- **Trigger:** Changes to `frontend/` folder or main branch
- **Process:** Build React app → Deploy to CDN
- **Output:** Updated web application

## 🧪 Testing Your Deployment

### Health Check Endpoints

```bash
# Test backend health
curl https://YOUR_API_GATEWAY_URL.amazonaws.com/prod/

# Test API endpoints
curl https://YOUR_API_GATEWAY_URL.amazonaws.com/prod/api/facts
curl https://YOUR_API_GATEWAY_URL.amazonaws.com/prod/api/breeds
curl https://YOUR_API_GATEWAY_URL.amazonaws.com/prod/api/gallery
```

### Frontend Testing

1. Visit your Amplify app URL
2. Navigate through all sections
3. Check browser console for errors
4. Test responsive design on mobile

## 🛠️ Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Verify `REACT_APP_API_BASE_URL` environment variable
- Check CORS configuration in FastAPI
- Ensure API Gateway is deployed correctly

**Lambda function timeout:**
- Check CloudWatch logs: `/aws/lambda/calico-cat-api-CalicoAPIFunction-XXX`
- Increase timeout in `template.yaml` if needed

**Amplify build fails:**
- Check Node.js version compatibility
- Verify `amplify.yml` build commands
- Check build logs in Amplify Console

**SAM deployment fails:**
- Verify AWS credentials and permissions
- Check CloudFormation stack events
- Ensure unique stack names

### Useful Commands

```bash
# Check AWS credentials
aws sts get-caller-identity

# View CloudFormation stacks
aws cloudformation list-stacks

# Check Lambda logs
aws logs tail /aws/lambda/YOUR_FUNCTION_NAME --follow

# Test API locally
curl http://localhost:8000/api/facts

# Build frontend locally
cd frontend && npm run build
```

## 🎉 Success!

You now have a fully deployed full-stack application:

- **Frontend:** React app hosted on AWS Amplify with CDN
- **Backend:** FastAPI running on AWS Lambda with API Gateway
- **CI/CD:** Automated deployments from your monorepo
- **Monitoring:** CloudWatch logs for debugging

Your calico cat encyclopedia is live and ready for users to explore! 🐱

## 📚 Next Steps

- **Custom Domain:** Configure a custom domain in Amplify
- **SSL Certificate:** AWS handles HTTPS automatically
- **Monitoring:** Set up CloudWatch alarms
- **Database:** Add DynamoDB for dynamic data
- **Authentication:** Implement user authentication
- **Caching:** Add CloudFront caching for better performance

Happy deploying! 🚀