import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import RedirectPage from './pages/RedirectPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <NavigationBar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:shortCode" element={<RedirectPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;