import React from 'react';

function CalicoFacts({ facts }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'genetics': return '🧬';
      case 'culture': return '🏛️';
      case 'history': return '📚';
      case 'personality': return '😸';
      case 'general': return '💡';
      default: return '🐱';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'genetics': return 'var(--color-teal-500)';
      case 'culture': return 'var(--color-orange-500)';
      case 'history': return 'var(--color-brown-600)';
      case 'personality': return 'var(--color-red-500)';
      case 'general': return 'var(--color-slate-500)';
      default: return 'var(--color-gray-400)';
    }
  };

  return (
    <div className="facts-container">
      {facts.map((fact) => (
        <div key={fact.id} className="fact-card">
          <div className="fact-header">
            <span 
              className="fact-icon"
              style={{ color: getCategoryColor(fact.category) }}
            >
              {getCategoryIcon(fact.category)}
            </span>
            <span 
              className="fact-category"
              style={{ color: getCategoryColor(fact.category) }}
            >
              {fact.category}
            </span>
          </div>
          <h3 className="fact-title">{fact.title}</h3>
          <p className="fact-description">{fact.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CalicoFacts;