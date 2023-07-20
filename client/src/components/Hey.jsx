import React, { useContext, useState } from 'react'
import Counter from './Counter.jsx'
import NextMeal from './NextMeal.jsx'
import NewMeal from './NewMeal.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import { StatContext } from '../context/StatProvider.jsx'
import { MealContext } from '../context/MealProvider.jsx'
import DailyDub from './DailyDub.jsx'

export default function Hey(){
    const { user } = useContext(UserContext)
    const { setStats }= useContext(StatContext)
    const { meals, getMeals } = useContext(MealContext)
    const [ newM, setNewM ] = useState(false)
    return (
        <div className='counter-container'>
            <div className=''>
                {newM ? 
                    <NewMeal setNewM={setNewM} user={user} setStats={setStats} />
                :
                    <div>
                        <div>
                            {!newM && <button onClick={() => setNewM(!newM)}>+M?</button>}
                            <Counter />
                        </div>
                            <DailyDub onDeck={true} mealss={meals} getMeals={getMeals} />
                    </div>
                }
            </div>
        </div>
        
    )
}