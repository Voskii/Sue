import React, {useContext} from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'
import { MealContext } from './context/MealProvider.jsx'
import Meals from './components/Meals.jsx'
import Auth from './components/Auth.jsx'
import Hey from './components/Hey.jsx'
import Counter from './components/Counter.jsx'
import Header from './components/Header.jsx';
import './style.css';
import './hey.css'

function App() {
  const { token, logout, user} = useContext(UserContext)
  const { getFav } = useContext(MealContext)
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 550px)' })
  return (
    <div className="">
      { token &&
        <>
          <Header logout={logout}  />
          <nav className=''>
            <Link to="/">Hey</Link>
            <Link to="meals">Meals</Link>
            <button onClick={logout} className='log-butt'>Logout</button>
            {/* <Link to='counter'>Fav</Link> */}
          </nav>
        </>
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
          </ProtectedRoute>
          }
        />
        <Route
          path='/counter' element = {<ProtectedRoute token={token} redirectTo='/'>
            <Counter comp={true} getFav={getFav} user={user} />
          </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;