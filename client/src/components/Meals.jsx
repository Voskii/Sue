import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
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
    const [checked, setChecked] = useState(false)

    const mealClicked = (meal) => {
        console.log(`meal clicked`)
        getStats(meal._id)
        setShowStats(!showStats)
        setChosen(meal)
    }

    const track = (meal) => {
        console.log(meal)
        setChecked(!checked)
        setTrackedMeals(prev => [
            ...prev,
            meal.name
        ])
    }

    const mapMe = meals.map(meal => {
        
        return (
            <div>
                {/* <div key={meal._id} onClick={() => mealClicked(meal)}><span onClick={()=>track(meal)}>{checked? '👀':'✨'}</span>  {meal.name}✨</div> */}
                <Meal key={meal._id} noBro={true} meal={meal} checked={checked} setChecked={setChecked} mealClicked={mealClicked} track={track} />
                {/* {showStats && stats && stats.map(item => <Stat info={item}/>)} */}
            </div>
        )
    }) 

    const cleanUp = () => {
        setChosen('')
        
        setShowStats(false)
    }

    return (
        <div>
            {chosen? 
                <div>
                    <Meal onClick={cleanUp} meal={chosen} stats={stats} cleanUp={cleanUp} setStats={setStats} />
                    
                </div>
            :
            mapMe
            }

        </div>
    )
}

export default Meals