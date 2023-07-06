import React, {useContext} from 'react'
import { UserContext } from '../context/UserProvider.jsx'

export default function Hey(){
    const { user } = useContext(UserContext)
    return (
        <div className='heyContainer'>
            
        </div>
    )
}