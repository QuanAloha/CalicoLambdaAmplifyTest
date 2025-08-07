import React, { useState, useEffect } from 'react';
import CalicoFacts from './components/CalicoFacts';
import BreedCard from './components/BreedCard';
import { fetchFacts, fetchBreeds, fetchGallery } from './services/api';
import './styles/App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [factsData, breedsData, galleryData] = await Promise.all([
          fetchFacts(),
          fetchBreeds(),
          fetchGallery()
        ]);
        
        setFacts(factsData);
        setBreeds(breedsData);
        setGallery(galleryData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data if API fails
        loadMockData();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const loadMockData = () => {
    // Fallback data in case API is not available
    setFacts([
      {
        id: 1,
        title: "Almost Always Female",
        description: "About 99.9% of calico cats are female due to X-chromosome genetics.",
        category: "genetics"
      },
      {
        id: 2,
        title: "Not a Breed",
        description: "Calico refers to a coat pattern, not a breed. Any domestic cat breed can have calico markings.",
        category: "general"
      },
      {
        id: 3,
        title: "Lucky Cats",
        description: "In many cultures, calico cats are considered lucky and bring good fortune.",
        category: "culture"
      }
    ]);

    setBreeds([
      {
        name: "American Shorthair",
        description: "Medium to large cats with muscular builds and strong hunting instincts.",
        temperament: "Independent, intelligent, friendly",
        characteristics: ["Sturdy build", "Round face", "Dense coat"]
      },
      {
        name: "Japanese Bobtail", 
        description: "Medium-sized cats with distinctive short, pom-pom-like tails.",
        temperament: "Playful, sociable, vocal",
        characteristics: ["Bobtail", "Lean but muscular", "Forward-tilting ears"]
      }
    ]);

    setGallery([
      {
        id: 1,
        type: "traditional",
        name: "Traditional Calico",
        description: "Classic white base with distinct black and orange patches."
      },
      {
        id: 2,
        type: "dilute",
        name: "Dilute Calico", 
        description: "Softer colors with gray and cream replacing black and orange."
      }
    ]);
  };

  const stats = [
    { label: "Female Percentage", value: "99.9%", description: "Of all calico cats are female" },
    { label: "Male Rarity", value: "1 in 3,000", description: "Odds of a male calico cat" },
    { label: "Breeds with Calicos", value: "12+", description: "Different breeds can have calico patterns" },
    { label: "X Chromosomes Required", value: "2", description: "Needed for calico coat pattern" }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading calico cat data...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          <h1 className="nav-title">🐱 Calico Cat Encyclopedia</h1>
          <ul className="nav-menu">
            <li><button className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
                onClick={() => setActiveSection('home')}>Home</button></li>
            <li><button className={`nav-link ${activeSection === 'facts' ? 'active' : ''}`} 
                onClick={() => setActiveSection('facts')}>Facts</button></li>
            <li><button className={`nav-link ${activeSection === 'breeds' ? 'active' : ''}`} 
                onClick={() => setActiveSection('breeds')}>Breeds</button></li>
            <li><button className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`} 
                onClick={() => setActiveSection('gallery')}>Gallery</button></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        {activeSection === 'home' && (
          <section className="section hero">
            <div className="hero-content">
              <h1>Discover the Amazing World of Calico Cats</h1>
              <p>
                Explore the fascinating genetics, history, and characteristics of these uniquely beautiful felines. 
                From their rare male genetics to their distinctive coat patterns, learn everything about calico cats!
              </p>
              <button className="cta-button" onClick={() => setActiveSection('facts')}>
                Explore Facts
              </button>
            </div>
            
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'facts' && (
          <section className="section">
            <h2>Fascinating Calico Cat Facts</h2>
            <CalicoFacts facts={facts} />
          </section>
        )}

        {activeSection === 'breeds' && (
          <section className="section">
            <h2>Cat Breeds with Calico Patterns</h2>
            <div className="breeds-grid">
              {breeds.map((breed, index) => (
                <BreedCard key={index} breed={breed} />
              ))}
            </div>
          </section>
        )}

        {activeSection === 'gallery' && (
          <section className="section">
            <h2>Calico Pattern Gallery</h2>
            <div className="gallery-grid">
              {gallery.map((item) => (
                <div key={item.id} className="gallery-card">
                  <div className={`gallery-image gallery-${item.type}`}>
                    <span className="pattern-preview">🐱</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="pattern-type">{item.type}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Calico Cat Encyclopedia. Made with ❤️ for cat lovers!</p>
      </footer>
    </div>
  );
}

export default App;