import React, { useContext, useState } from 'react'
import Counter from './Counter.jsx'
import NextMeal from './NextMeal.jsx'
import NewMeal from './NewMeal.jsx'
import { UserContext } from '../context/UserProvider.jsx'

export default function Hey(){
    const { user } = useContext(UserContext)
    const [ newM, setNewM ] = useState(false)
    return (
        <div className='counter-component'>
            
            {newM ? 
                <NewMeal setNewM={setNewM}/>
            :
                <div>
                    <div>
                        {!newM && <button onClick={() => setNewM(!newM)}>+M?</button>}
                        <Counter />
                    </div>
                    <NextMeal />
                </div>
            }
        </div>
    )
}