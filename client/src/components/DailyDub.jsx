import React, { useState, useContext } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'

const DailyDub = (props) => {
// stat map, add values together for the day, back end storage for total stats vs max stats for the day, contains array of selected user meals
// setStats code will need to be stats for value tracking items only
    const { mealss, onDeck, generate} = props
    const { addMeal, getMeals, meals, mealId } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub } = useContext(DubContext)

    const mapMe = mealss.map(meal => (<h3>{meal.name}</h3>))
    console.log(`inside DailyDub:dub`, dub, `mealss:`, mealss)
    return (
        <div className='daily-dub-container'>
            {generate && 
                <>
                    <h3>Tracked Meals</h3> 
                    {mapMe}
                    <button>SMASH ME</button>
                </>
            }
            {onDeck && mealss &&
                <>
                    <h3>On Deck Meals</h3>
                    {/* {mapMe} */}
                    <button>SMASH ME</button>
                </>
            }
        </div>
    )
}

export default DailyDub