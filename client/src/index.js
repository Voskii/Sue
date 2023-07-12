import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from './context/UserProvider.jsx'
import './style.css';
import App from './App';
import { MealProvider } from './context/MealProvider.jsx';
import { StatProvider } from './context/StatProvider.jsx'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <MealProvider>
          <StatProvider>
            <App />
          </StatProvider>
        </MealProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);