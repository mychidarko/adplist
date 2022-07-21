import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/login';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
