import { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import MoodDisplay from './components/MoodDisplay';
import './index.css';

const MOODS = [
  { id: 'happy', label: 'Happy', emoji: '🌞', quote: "Radiate positivity! Make today amazing." },
  { id: 'calm', label: 'Calm', emoji: '🌿', quote: "Breathe in deeply. Find your inner peace." },
  { id: 'energetic', label: 'Energetic', emoji: '⚡', quote: "Unleash your power! You can conquer anything." },
  { id: 'sad', label: 'Sad', emoji: '🌧️', quote: "It's okay to feel down. Storms don't last forever." },
  { id: 'angry', label: 'Angry', emoji: '🌋', quote: "Take a step back. Let go of what you can't control." },
];

function App() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className={`app-container ${selectedMood ? selectedMood.id : 'default'}`}>
      <div className="glass-panel">
        <h1 className="title">How are you feeling today?</h1>
        <MoodDisplay mood={selectedMood} />
        <MoodSelector moods={MOODS} selectedMood={selectedMood} onSelect={setSelectedMood} />
      </div>
    </div>
  );
}

export default App;
