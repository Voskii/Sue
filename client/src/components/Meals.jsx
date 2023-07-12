import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import Stat from './Stat'

const Meals = () => {
    const { addMeal, getMeals, meals, mealId } = useContext(MealContext)
    const { getStats, stats } = useContext(StatContext)
    const [showStats, setShowStats] = useState(false)
    console.log(meals)

    useEffect(() => {

        getMeals()

    },[])

    const mealClicked = (id) => {
        getStats(id)
        setShowStats(!showStats)
    }

    const mapMe = meals.map(meal => {
    
       return (
        <div>
            <h2 key={meal._id} onClick={() => mealClicked(meal._id)}>{meal.name}</h2>
        </div>
        )
    }) 

    return (
        <div>
            {mapMe}
            {showStats && stats && stats.map(item => <Stat info={item}/>)}
        </div>
    )
}

export default Meals