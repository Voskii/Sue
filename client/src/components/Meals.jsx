import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import StatGen from './StatGen'
import Meal from './Meal'
import Stat from './Stat'

const Meals = () => {
    const { addMeal, getMeals, meals, mealId } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const [ showStats, setShowStats ] = useState(false)
    console.log(meals)

    useEffect(() => {

        getMeals()

    },[])

    const [chosen, setChosen] = useState('')
    const [trackedMeals, setTrackedMeals] = useState([])
    const [createStat, setCreateStat] = useState(false)

    const mealClicked = (meal) => {
        console.log(`meal clicked`)
        getStats(meal._id)
        setChosen(meal)
        setShowStats(!showStats)
    }

    const track = (meal) => {
        console.log(meal)
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
                    <div>
                        <Meal key={meal._id} noBro={true} meal={meal} mealClicked={mealClicked} track={track} setShowStats={setShowStats} showStats={showStats} statMe={statMe}/>
                        
                        
                        <button onClick={''}>+Stat?</button>
                    </div>
                    }
                
            </div>
        )
    }) 

    return (
        <div>
            {chosen? 
                <div>
                    <Meal onClick={cleanUp} meal={chosen} stats={stats} cleanUp={cleanUp} setStats={setStats} choosing={true}/>
                    
                </div>
            :
            mapMe
            }

        </div>
    )
}

export default Meals