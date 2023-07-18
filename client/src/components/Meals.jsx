import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
import StatGen from './StatGen'
import Meal from './Meal'
import Stat from './Stat'
import DailyDub from './DailyDub'

const Meals = () => {
    const { addMeal, getMeals, meals, mealId } = useContext(MealContext)
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
        getStats(meal._id)
        setChosen(meal)
        setShowStats(!showStats)
    }

    const track = (meal) => {
        console.log(`inside track func`, meal)
        getStats(meal._id)
        addDubStat(meal)
        addDubMealStat(stats)
        setTracking(true)
        setTrackedMeals(prev => [
            ...prev,
            meal.name
        ])
    }

    const cleanUp = () => {
        setChosen('')
        
        setShowStats(false)
    }

    const statMe = stats?.map(item => <Stat info={item} />)

    const mapMe = meals.map(meal => {

        return (
            <div>
                {createStat? 
                    <StatGen setCreateStat={setCreateStat} createStat={createStat} meal={meal._id} setStats={setStats}/> 
                :
                    <Meal key={meal._id} noBro={true} meal={meal} mealClicked={mealClicked} track={track} setShowStats={setShowStats} showStats={showStats} statMe={statMe}/>
                }
            </div>
        )
    }) 

    return (
        <div>
            {chosen? 
                <div>
                    <Meal onClick={cleanUp} meal={chosen} stats={stats} cleanUp={cleanUp} setStats={setStats} statMe={statMe} setShowStats={setShowStats} showStats={showStats} />
                    
                </div>
            :
                <div className='hey-meals'>
                    <ul>
                        {mapMe}
                    </ul>
                    
                    {tracking && <DailyDub />}
                </div>
            
            }

        </div>
    )
}

export default Meals