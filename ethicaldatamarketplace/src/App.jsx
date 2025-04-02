import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Upload from './pages/Upload';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 AkaveAI | Filecoin AI Blueprints Hackathon</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;