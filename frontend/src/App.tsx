import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import IssuancePage from './pages/IssuancePage';
import VerificationPage from './pages/VerificationPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/issue" replace />} />
          <Route path="/issue" element={<IssuancePage />} />
          <Route path="/verify" element={<VerificationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;