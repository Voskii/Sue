import React, {useContext} from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'
import Meals from './components/Meals.jsx'
import Auth from './components/Auth.jsx'
import Hey from './components/Hey.jsx'
import Header from './components/Header.jsx';
import './style.css';
import './hey.css'

function App() {
  const { token, logout} = useContext(UserContext)
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 550px)' })
  return (
    <div className="">
      { token && 
        <nav className=''>
          <Header logout={logout}  />
          <Link to="meals">Meals</Link> 
        </nav>
      }
      <Routes>
        <Route 
          path='/' element = { token ? <Navigate to="/hey"/> : <Auth /> }
        />
        <Route
          path='/hey' element = {<ProtectedRoute token={token} redirectTo='/'>
            <Hey />
          </ProtectedRoute>}
        />
        <Route
          path='/meals' element = {<ProtectedRoute token={token} redirectTo='/'>
            <Meals />
          </ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;