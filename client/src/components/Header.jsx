import React, { useContext } from 'react'
import yom from '../images/HeyYou1.png'

import { UserContext } from '../context/UserProvider.jsx'

export default function Header(props){
    const {user} = useContext(UserContext)
    const {logout, userState} = props
    console.log(userState)
    return(
        <div style={{textAlign: '', padding: '5'}} className='header'>
            <div style={{display: 'flex'}}>
                <img src={yom} className='header-img'/>
                <div className='header-name'>HeyYou!</div>
            </div>
            <button onClick={logout} className='log-butt'>Logout</button>
        </div>
    )
}