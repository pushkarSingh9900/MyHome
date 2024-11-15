// src/App.js

import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h1>Welcome to the Application</h1>
          {/* Main application components go here */}
        </div>
      )}
    </div>
  );
}

export default App;
