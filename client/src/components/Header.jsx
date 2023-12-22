import React, { useContext } from 'react'

import { UserContext } from '../context/UserProvider.jsx'

export default function Header(props){
    const {user} = useContext(UserContext)
    const {logout, userState} = props
    console.log(userState)
    return(
        <header style={{textAlign: 'center', padding: '25px'}}>
            <div style={{fontSize: '2em'}}>🌻{user.username.charAt(0).toUpperCase() + user.username.slice(1)}🌻</div>
        </header>
    )
}