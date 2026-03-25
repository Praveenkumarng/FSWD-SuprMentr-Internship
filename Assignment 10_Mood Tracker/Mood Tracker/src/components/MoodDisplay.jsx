import React from 'react';

function MoodDisplay({ mood }) {
  if (!mood) {
    return (
      <div className="empty-state">
        <p>Select a mood to see a message...</p>
      </div>
    );
  }

  // Key change on the wrapper forces a re-render and re-triggers the animation
  return (
    <div className="mood-display" key={mood.id}>
      <div className="display-emoji" role="img" aria-label={mood.label}>
        {mood.emoji}
      </div>
      <div className="display-label">{mood.label}</div>
      <div className="display-quote">"{mood.quote}"</div>
    </div>
  );
}

export default MoodDisplay;
