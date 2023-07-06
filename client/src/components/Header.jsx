import React from 'react'

export default function Header(props){
    const {logout} = props
    return(
        <header style={{textAlign: 'center'}}>
            <div style={{fontSize: '6em'}}>Hello Sue!</div>
            <button onClick={logout} className='game logButt'>Logout</button>
        </header>
    )
}