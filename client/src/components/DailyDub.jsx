import React, { useState, useContext } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'

const DailyDub = () => {
// stat map, add values together for the day, back end storage for total stats vs max stats for the day, contains array of selected user meals
// setStats code will need to be stats for value tracking items only
    const { addMeal, getMeals, meals, mealId } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub } = useContext(DubContext)

    const mapMe = ''
    
    return (
        <div>
            DAILY DUB
        </div>
    )
}

export default DailyDub