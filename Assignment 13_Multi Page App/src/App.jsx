import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css'; // Optional: keep or remove since we styled in index.css
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="page fade-in"><h1>404 Not Found</h1><p>The page you're looking for doesn't exist.</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
