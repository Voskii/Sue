import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider.jsx'

export default function Header(props){
    const {user} = useContext(UserContext)
    const {logout, userState} = props
    console.log(userState)
    return(
        <header style={{textAlign: 'center'}}>
            <div style={{fontSize: '6em'}}>Hello {user.username}!</div>
            <button onClick={logout} className='game logButt'>Logout</button>
        </header>
    )
}