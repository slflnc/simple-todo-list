import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; // Ensure the path to your Home component is correct
import Users from './pages/users'; // Import your Users component
import Calendar from './pages/calendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/calendar" component={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
