import React from 'react';

function MoodSelector({ moods, selectedMood, onSelect }) {
  return (
    <div className="mood-grid">
      {moods.map((mood) => {
        const isActive = selectedMood && selectedMood.id === mood.id;
        return (
          <button
            key={mood.id}
            onClick={() => onSelect(mood)}
            className={`mood-btn ${isActive ? 'active' : ''}`}
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="mood-btn-emoji" role="img" aria-hidden="true">{mood.emoji}</span>
            <span className="mood-btn-label">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MoodSelector;
