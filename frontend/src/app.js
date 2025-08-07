// Application data (simulating API responses)
const appData = {
  calicoFacts: [
    {
      id: 1,
      title: "Almost Always Female",
      description: "About 99.9% of calico cats are female due to X-chromosome genetics. Male calicos are incredibly rare and usually sterile.",
      category: "genetics"
    },
    {
      id: 2,
      title: "Not a Breed",
      description: "Calico refers to a coat pattern, not a breed. Any domestic cat breed can potentially have calico markings.",
      category: "general"
    },
    {
      id: 3,
      title: "Lucky Cats",
      description: "In many cultures, calico cats are considered lucky. In Japan, they're called 'Mi-ke' and are believed to bring good fortune.",
      category: "culture"
    },
    {
      id: 4,
      title: "X-Chromosome Inactivation",
      description: "The distinctive patches result from lyonization - random inactivation of X chromosomes during development.",
      category: "genetics"
    },
    {
      id: 5,
      title: "Mediterranean Origins",
      description: "Calico cats likely originated in Egypt and spread along Mediterranean trade routes via merchant ships.",
      category: "history"
    },
    {
      id: 6,
      title: "Sassy Personalities",
      description: "Many calico owners report their cats have strong, independent personalities - often called 'calico attitude' or 'tortitude'.",
      category: "personality"
    }
  ],
  breeds: [
    {
      name: "American Shorthair",
      description: "Medium to large cats with muscular builds. Known as 'working cats' with strong hunting instincts.",
      temperament: "Independent, intelligent, friendly",
      characteristics: ["Sturdy build", "Round face", "Dense coat"]
    },
    {
      name: "Japanese Bobtail",
      description: "Medium-sized cats with distinctive short, pom-pom-like tails. Highly prized in Japanese culture.",
      temperament: "Playful, sociable, vocal",
      characteristics: ["Bobtail", "Lean but muscular", "Forward-tilting ears"]
    },
    {
      name: "Maine Coon",
      description: "Large, gentle giants with shaggy coats. One of the largest domestic cat breeds.",
      temperament: "Gentle, intelligent, sociable",
      characteristics: ["Large size", "Tufted ears", "Bushy tail"]
    },
    {
      name: "Persian",
      description: "Long-haired cats with flat faces and luxurious coats. One of the oldest cat breeds.",
      temperament: "Sweet, calm, gentle",
      characteristics: ["Long coat", "Flat face", "Stocky build"]
    },
    {
      name: "British Shorthair",
      description: "Round-faced cats with dense, plush coats. Known for their calm, easy-going nature.",
      temperament: "Calm, independent, affectionate",
      characteristics: ["Round features", "Dense coat", "Sturdy build"]
    },
    {
      name: "Turkish Van",
      description: "Large, semi-longhaired cats known for their love of water and distinctive markings.",
      temperament: "Active, intelligent, playful",
      characteristics: ["Semi-long coat", "Athletic build", "Love of water"]
    }
  ],
  galleryItems: [
    {
      id: 1,
      type: "traditional",
      name: "Traditional Calico",
      description: "Classic white base with distinct black and orange patches. The most recognizable calico pattern."
    },
    {
      id: 2,
      type: "dilute",
      name: "Dilute Calico",
      description: "Softer colors with gray (blue) and cream replacing black and orange. More muted and elegant appearance."
    },
    {
      id: 3,
      type: "caliby",
      name: "Caliby",
      description: "Calico pattern combined with tabby markings. Features stripes within the colored patches."
    },
    {
      id: 4,
      type: "traditional",
      name: "High White Calico",
      description: "Predominantly white with smaller patches of black and orange, typically on the head and tail."
    },
    {
      id: 5,
      type: "dilute",
      name: "Dilute Tortoiseshell",
      description: "Similar to dilute calico but with minimal white, showing primarily blue and cream colors."
    },
    {
      id: 6,
      type: "caliby",
      name: "Tabby Calico",
      description: "Traditional calico coloring with distinct tabby stripes, especially visible in orange sections."
    }
  ],
  stats: [
    {
      label: "Female Percentage",
      value: "99.9%",
      description: "Of all calico cats are female"
    },
    {
      label: "Male Rarity",
      value: "1 in 3,000",
      description: "Odds of a male calico cat"
    },
    {
      label: "Breeds with Calicos",
      value: "12+",
      description: "Different breeds can have calico patterns"
    },
    {
      label: "X Chromosomes Required",
      value: "2",
      description: "Needed for calico coat pattern"
    }
  ]
};

// Application state
let currentSection = 'home';
let currentFactsFilter = 'all';
let currentGalleryFilter = 'all';
let isInitialized = false;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    if (isInitialized) return;
    
    // Show loading
    showLoading();
    
    // Simulate API loading time
    await delay(800);
    
    // Initialize all components
    setupNavigation();
    renderStats();
    renderFacts();
    renderBreeds();
    renderGallery();
    setupFilters();
    initializeRouting();
    
    // Hide loading
    hideLoading();
    
    isInitialized = true;
}

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            if (targetSection) {
                navigateToSection(targetSection);
            }
        });
    });
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Hero CTA button
    const heroCta = document.querySelector('.hero__cta');
    if (heroCta) {
        heroCta.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToSection('facts');
        });
    }
}

function navigateToSection(targetSection) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Remove active class from all sections and nav links
    sections.forEach(section => {
        section.classList.remove('active', 'fade-in');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to target section and nav link
    const targetSectionElement = document.getElementById(targetSection);
    const targetNavLink = document.querySelector(`[data-section="${targetSection}"]`);
    
    if (targetSectionElement) {
        targetSectionElement.classList.add('active');
        setTimeout(() => {
            targetSectionElement.classList.add('fade-in');
        }, 50);
        currentSection = targetSection;
    }
    
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // Update URL
    updateURLHash(targetSection);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Stats rendering
function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;
    
    statsGrid.innerHTML = appData.stats.map(stat => `
        <div class="stat-card">
            <span class="stat-card__value">${stat.value}</span>
            <span class="stat-card__label">${stat.label}</span>
            <p class="stat-card__description">${stat.description}</p>
        </div>
    `).join('');
}

// Facts rendering
function renderFacts(filter = 'all') {
    const factsGrid = document.getElementById('factsGrid');
    if (!factsGrid) return;
    
    let filteredFacts = appData.calicoFacts;
    if (filter !== 'all') {
        filteredFacts = appData.calicoFacts.filter(fact => fact.category === filter);
    }
    
    factsGrid.innerHTML = filteredFacts.map(fact => `
        <div class="fact-card" data-category="${fact.category}">
            <span class="fact-card__category">${fact.category}</span>
            <h3 class="fact-card__title">${fact.title}</h3>
            <p class="fact-card__description">${fact.description}</p>
        </div>
    `).join('');
}

// Breeds rendering
function renderBreeds() {
    const breedsGrid = document.getElementById('breedsGrid');
    if (!breedsGrid) return;
    
    breedsGrid.innerHTML = appData.breeds.map(breed => `
        <div class="breed-card">
            <h3 class="breed-card__name">${breed.name}</h3>
            <p class="breed-card__description">${breed.description}</p>
            <div class="breed-card__temperament">
                <span class="breed-card__temperament-label">Temperament:</span>
                <span class="breed-card__temperament-text">${breed.temperament}</span>
            </div>
            <ul class="breed-card__characteristics">
                ${breed.characteristics.map(char => `
                    <li class="breed-card__characteristic">${char}</li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Gallery rendering
function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    let filteredItems = appData.galleryItems;
    if (filter !== 'all') {
        filteredItems = appData.galleryItems.filter(item => item.type === filter);
    }
    
    galleryGrid.innerHTML = filteredItems.map(item => `
        <div class="gallery-item" data-type="${item.type}">
            <div class="gallery-item__image"></div>
            <div class="gallery-item__content">
                <span class="gallery-item__type">${item.type}</span>
                <h3 class="gallery-item__name">${item.name}</h3>
                <p class="gallery-item__description">${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Filter setup
function setupFilters() {
    // Facts filters
    const factsFilters = document.querySelectorAll('.facts-filter .filter-btn');
    factsFilters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all buttons
            factsFilters.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            currentFactsFilter = category;
            renderFacts(category);
        });
    });
    
    // Gallery filters
    const galleryFilters = document.querySelectorAll('.gallery-filter .filter-btn');
    galleryFilters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all buttons
            galleryFilters.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const type = btn.getAttribute('data-type');
            currentGalleryFilter = type;
            renderGallery(type);
        });
    });
}

// URL and routing
function updateURLHash(section) {
    if (history.pushState) {
        history.pushState(null, null, `#${section}`);
    } else {
        window.location.hash = section;
    }
}

function initializeRouting() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        navigateToSection(hash);
    } else {
        navigateToSection('home');
    }
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    const hash = window.location.hash.slice(1) || 'home';
    if (document.getElementById(hash)) {
        navigateToSection(hash);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    hideLoading();
});

// Prevent flash of unstyled content
document.documentElement.style.visibility = 'visible';