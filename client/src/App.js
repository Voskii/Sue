import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'
import Auth from './components/Auth.jsx'
import Hey from './components/Hey.jsx'
import Header from './components/Header.jsx';
import './style.css';

function App() {
  const { token, logout } = useContext(UserContext)
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 550px)' })
  return (
    <div className="App">
      { token && 
        <div className='sticky-box shrink fish'>
          <Header logout={logout}/>
          {/* <Navbar /> */}
        </div>
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
      </Routes>
    </div>
  );
}

export default App;
