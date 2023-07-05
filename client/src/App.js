import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './style.css';

function App() {
  // const { token, logout } = useContext(UserContext) 
  return (
    <div className="App">
      Hello Sue!
    </div>
  );
}

export default App;
