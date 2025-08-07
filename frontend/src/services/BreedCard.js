import React from 'react';

function BreedCard({ breed }) {
  return (
    <div className="breed-card">
      <div className="breed-header">
        <h3 className="breed-name">{breed.name}</h3>
        <div className="breed-icon">🐱</div>
      </div>
      
      <p className="breed-description">{breed.description}</p>
      
      <div className="breed-info">
        <div className="breed-temperament">
          <strong>Temperament:</strong>
          <span>{breed.temperament}</span>
        </div>
        
        <div className="breed-characteristics">
          <strong>Key Characteristics:</strong>
          <ul>
            {breed.characteristics.map((characteristic, index) => (
              <li key={index}>{characteristic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BreedCard;