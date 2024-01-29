import React, {useContext, useState} from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'
import { MealContext } from './context/MealProvider.jsx'
import { StatContext } from './context/StatProvider.jsx'
import Meals from './components/Meals.jsx'
import Auth from './components/Auth.jsx'
import Hey from './components/Hey.jsx'
import Counter from './components/Counter.jsx'
import Header from './components/Header.jsx';
import OvenMit from './images/Ovenmit.png'
import YOM from './images/Meal.png'
import ADD from './images/Joyentred.png'
import './style.css';
import './hey.css'
import NewMeal from './components/NewMeal.jsx'

function App() {
  const { token, logout, user} = useContext(UserContext)
  const { getFav, dubs } = useContext(MealContext)
  const { getStats, stats, setStats } = useContext(StatContext)
  const [ newM, setNewM ] = useState(false)
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 550px)' })
  const location = useLocation()
  console.log('location', location)

  return (
    <div className={token && dubs.length === 0 && location.pathname !== '/meals' ? 'hey-background' : ''}>
      { token && dubs.length === 0 ?
        <>
          <Header logout={logout}  />
          {location.pathname === '/hey' && <div className='welcome-user'>Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</div>}
          {location.pathname === '/meals' && <div className='welcome-userr'>Click Meal Name or Star!</div>}
        </>
        :token && dubs.length !== 0 && 
        <>
          <Header logout={logout}  />
          {location.pathname === '/meals' && <div className='welcome-userr'>Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</div>}
          {location.pathname === '/hey' && <div className='welcome-userr'>Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</div>}
        </>
      }
      {location.pathname === '/meals' && !newM && <div style={{textAlign: 'center', marginBottom: '20px'}}><button className='add-meal-butt' onClick={() => setNewM(!newM)}><img src={ADD} style={{width: 'fit-content'}}/>Meal?</button></div>}
      {newM ? 
        <NewMeal setNewM={setNewM} user={user} setStats={setStats} />
      :
      <nav className=''>
        
        <Link to="/" className='hey-span'><img src={OvenMit} /><span>Hey</span></Link>
        <Link to="meals" className='meals-span'><img src={YOM} /><span>Meals</span></Link>
        {/* <Link to='counter'>Fav</Link> */}
      </nav>
      }
      
      <Routes>
        <Route 
          path='/' element = { token ? <Navigate to="/hey"/> : <Auth /> }
        />
        <Route
          path='/hey' element = {<ProtectedRoute token={token} redirectTo='/'>
            
            <Hey isHey={true} location={location.pathname} />
          </ProtectedRoute>}
        />
        <Route
          path='/meals' element = {<ProtectedRoute token={token} redirectTo='/'>
            
            {!newM && <Meals isMeals={true} location={location.pathname} />}
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