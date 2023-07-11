import React, { useContext, useEffect, useState } from 'react'
import { MealContext } from '../context/MealProvider'

const Meals = () => {
    const { addMeal, getMeals, meals } = useContext(MealContext)
    console.log(meals)

    useEffect(() => {

        getMeals()

    },[])

    const mapMe = meals.map(meal => <h3 key={meal._id}>{meal.name}</h3>)

    return (
        <div>
            {mapMe}
        </div>
    )
}

export default Meals