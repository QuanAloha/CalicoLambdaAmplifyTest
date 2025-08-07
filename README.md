# Calico Cat Encyclopedia - Full Stack Application

A full-stack monorepo application featuring a React frontend and FastAPI backend, all about Calico cats! This project demonstrates how to deploy a React frontend to AWS Amplify and a FastAPI backend to AWS Lambda + API Gateway from a single repository.

## 🏗️ Project Structure

```
calico-cat-monorepo/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── amplify.yml          # AWS Amplify build configuration
├── backend/                 # FastAPI application  
│   ├── routes/
│   ├── data/
│   ├── main.py
│   ├── requirements.txt
│   ├── template.yaml        # SAM template for Lambda deployment
│   └── buildspec.yml        # CodeBuild configuration
├── .github/workflows/       # CI/CD workflows
│   ├── deploy-frontend.yml
│   └── deploy-backend.yml
└── README.md
```

## 🚀 Deployment Guide

### Prerequisites
- AWS Account
- GitHub account
- Node.js and npm installed
- AWS CLI configured
- AWS SAM CLI installed (for local testing)

### Frontend Deployment (AWS Amplify)

1. **Connect to AWS Amplify:**
   - Go to AWS Amplify Console
   - Choose "Host web app"
   - Connect your GitHub repository
   - Select the `frontend` folder as the app root

2. **Configure Build Settings:**
   - Amplify will auto-detect React and use the `amplify.yml` configuration
   - The build will automatically run when you push to your main branch

### Backend Deployment (AWS Lambda + API Gateway)

1. **Manual Deployment with SAM:**
   ```bash
   cd backend
   sam build
   sam deploy --guided
   ```

2. **Automated Deployment with GitHub Actions:**
   - Push to main branch triggers the backend deployment workflow
   - Requires AWS credentials configured in GitHub Secrets:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `AWS_REGION`

### Environment Variables

**Frontend (.env):**
```
REACT_APP_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/prod
```

**Backend (Lambda Environment):**
- No additional environment variables needed for this demo

## 🔄 CI/CD Pipeline

- **Frontend:** AWS Amplify automatically rebuilds and deploys on every push to main
- **Backend:** GitHub Actions workflow deploys FastAPI to Lambda on backend changes

## 📱 Features

- **Frontend:** Interactive React app with calico cat information
- **Backend:** REST API serving calico cat data
- **Responsive:** Works on mobile and desktop
- **Cloud Native:** Fully serverless architecture

## 🧬 About Calico Cats

This app teaches you about:
- Calico genetics and X-chromosome inactivation
- Different calico patterns and variations  
- Cat breeds that can have calico coloring
- Cultural significance of calico cats

## 🛠️ Local Development

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📊 API Endpoints

- `GET /` - Health check
- `GET /api/facts` - Get calico cat facts
- `GET /api/breeds` - Get cat breeds with calico patterns
- `GET /api/gallery` - Get gallery images/patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to your branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details