// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clicker from './Clicker';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Clicker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
