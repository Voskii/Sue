import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
import StatGen from './StatGen'
import Meal from './Meal'
import Stat from './Stat'
import DailyDub from './DailyDub'

const Meals = () => {
    const { addMeal, getMeals, meals, mealId, fullMeal } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub, addDubStat, addDubMealStat } = useContext(DubContext)
    
    const [ showStats, setShowStats ] = useState(false)
    console.log(meals)

    useEffect(() => {

        getMeals()

    },[])

    const [chosen, setChosen] = useState('')
    const [trackedMeals, setTrackedMeals] = useState([])
    const [tracking, setTracking] = useState(false)
    const [createStat, setCreateStat] = useState(false)



    const mealClicked = (meal) => {
        console.log(`meal clicked`)
        setChosen(meal)
        setShowStats(!showStats)
    }

    const track = (meal) => {
        console.log(`inside track func`, meal)
        console.log(stats)
        addDubStat(stats)
        addDubMealStat(meal)
        setTracking(true)
        setTrackedMeals(prev => [
            ...prev,
            meal
        ])
    }

    const cleanUp = () => {
        setChosen('')
        
        setShowStats(false)
    }

    const mapMe = fullMeal.map(meal => {

        return (
            <div>
                {createStat? 
                    <StatGen setCreateStat={setCreateStat} createStat={createStat} meal={meal._id} setStats={setStats}/> 
                :
                    <Meal key={meal._id} noBro={true} meal={meal} mealClicked={mealClicked} track={track} setShowStats={setShowStats} showStats={showStats} />
                }
            </div>
        )
    }) 
    console.log(`trackedMeals bottom of comp`, trackedMeals)
    return (
        <div>
            {chosen? 
                <div>
                    <Meal key={chosen._id} onClick={cleanUp} meal={chosen} cleanUp={cleanUp} setShowStats={setShowStats} showStats={showStats} track={track} getStats={getStats} />
                    
                </div>
            :
                <div className='hey-meals-dd'>
                    <ul>
                        {mapMe}
                    </ul>
                    
                    {tracking && <DailyDub mealss={trackedMeals} generate={true} stats={stats} getStats={getStats} />}
                </div>
            
            }

        </div>
    )
}

export default Meals