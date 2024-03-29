import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Counter from './Counter.jsx'
import NextMeal from './NextMeal.jsx'
import NewMeal from './NewMeal.jsx'
import { UserContext } from '../context/UserProvider.jsx'
import { StatContext } from '../context/StatProvider.jsx'
import { MealContext } from '../context/MealProvider.jsx'
import DailyDub from './DailyDub.jsx'

export default function Hey(props){
    const {isHey, isMeal} = props
    const { user, thisStat, setThisStat, addPrioStat } = useContext(UserContext)
    const { setStats, stats, getStats } = useContext(StatContext)
    const { meals, getMeals, getDubs, dubs, tStats, newFav, getUserCounts, delCounts, counterStats } = useContext(MealContext)
    const [ newM, setNewM ] = useState(false)
    
    console.log('hey page load', tStats)
    console.log(`hey page dubs:`, dubs)


    useEffect(()=>{
        //get dubs
        getDubs(user)
        //get user counter stats
        getUserCounts(user)
    },[])

    // useEffect(() => {

    //     if(counterStats.protien === 0 && counterStats.calories === 0 && counterStats.fat === 0 && counterStats.sugar === 0 && dubs.length === 0){
    //         console.log('should hide button')
    //     setNoButton(true)
    // } else if (dubs.length === 0 && counterStats.calories > 0) {
    //     setNoButton(false)
    //     console.log('Show Button')
    // }

    // },[])

    const clearCounts = (e) =>{
        
        delCounts()
        // setNoButton(true)
    }

    return (
        <div>
            <div  className='counter-container'>
                <h1 className='daily-stats'>Daily Stats</h1>
                    <form onSubmit={delCounts}>
                        {/* {dubs.length === 0 && <button>X</button>} */}
                        {dubs.length === 0 && counterStats?.calories > 0 && <button>X</button>}
                    </form>
                <Counter newFav={newFav} tStats={stats} dubs={dubs} />
            </div>
            <div  className=''>
                <DailyDub onDeck={true} myTrackedMeals={meals} getMeals={getMeals} stats={stats} getStats={getStats} getDubs={getDubs} dubs={dubs} />
            </div>
        </div>
        
    )
}