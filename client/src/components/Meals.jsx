import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
import { UserContext } from '../context/UserProvider'
import StatGen from './StatGen'
import Meal from './Meal'
import Stat from './Stat'
import DailyDub from './DailyDub'


const Meals = () => {
    const { user } = useContext(UserContext)
    const { addMeal, getMeals, meals, mealId, fullMeal, getDubs, dubs, setMeals } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub} = useContext(DubContext)
    
    const [ showStats, setShowStats ] = useState(false)
    console.log(meals)

    useEffect(() => {
        getMeals()
        getDubs(user)
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
        setTracking(!tracking)
        setTrackedMeals(prev => [
            ...prev,
            meal
        ])
    }

    const cleanUp = () => {
        setChosen('')
        
        setShowStats(false)
    }

    const mapMe = meals.map(meal => {

        return (
            <div>
                {createStat? 
                    <StatGen key={meal._id} setCreateStat={setCreateStat} createStat={createStat} meal={meal._id} setStats={setStats} setNewM={false} stats={meal.stats} getMeals={getMeals} hideCounts={true} /> 
                :
                    <Meal key={meal._id} noBro={true} meal={meal} mealClicked={mealClicked} track={track} setShowStats={setShowStats} showStats={showStats} setNewM={false} stats={meal.stats} meals={meals} setMeals={setMeals}/>
                }
            </div>
        )
    }) 
    console.log(`trackedMeals bottom of comp`, trackedMeals)
    return (
        <div>
            <>
                {!chosen && !dubs[0] && <h6 style={{color: 'whitesmoke'}}>Click Meal name or Star!</h6>}
            </>
            
            {chosen? 
                <div>
                    <Meal key={chosen._id} onClick={cleanUp} meal={chosen} cleanUp={cleanUp} setShowStats={setShowStats} showStats={showStats} track={track} getStats={getStats} setStats={setStats}  meals={meals}/>
                    
                </div>
            :
                <div className='hey-meals-dd'>
                    <ul>
                        {mapMe}
                    </ul>
                    
                    {dubs && <DailyDub trackedMeals={trackedMeals} setTrackedMeals={setTrackedMeals} generate={true} stats={stats} getStats={getStats} getDubs={getDubs} dubs={dubs} />}
                </div>
            
            }

        </div>
    )
}

export default Meals