import React, { useContext, useEffect, useState } from 'react'
import Counter from './Counter.jsx'
import NextMeal from './NextMeal.jsx'
import NewMeal from './NewMeal.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import { StatContext } from '../context/StatProvider.jsx'
import { MealContext } from '../context/MealProvider.jsx'
import DailyDub from './DailyDub.jsx'

export default function Hey(){
    const { user, thisStat, setThisStat, addPrioStat } = useContext(UserContext)
    const { setStats, stats, getStats }= useContext(StatContext)
    const { meals, getMeals, getDubs, dubs, tStats } = useContext(MealContext)
    const [ newM, setNewM ] = useState(false)
    console.log('hey page load', tStats)
    console.log(`hey page dubs:`, dubs)
    useEffect(()=>{
        getDubs(user)
    },[])

    return (
        <div className='counter-container'>
            <div className=''>
                {newM ? 
                    <NewMeal setNewM={setNewM} user={user} setStats={setStats} />
                :
                    <div>
                        <div>
                            {!newM && <button onClick={() => setNewM(!newM)}>+M?</button>}
                            <Counter thisStat={thisStat} setThisStat={setThisStat} addPrioStat={addPrioStat} tStats={tStats} />
                        </div>
                            <DailyDub onDeck={true} mealss={meals} getMeals={getMeals} stats={stats} getStats={getStats} getDubs={getDubs} dubs={dubs} />
                    </div>
                }
            </div>
        </div>
        
    )
}