import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StatContext } from '../context/StatProvider'
import { MealContext } from '../context/MealProvider'

const StatGen = (props) => {

    const { handleSubmit, setMealIdNow, handleChange, newStat, setNewStat, newMeal, setTracked, getStats } = useContext(StatContext)
    const { meal, setNewM, setCreateStat, createStat, setStats, makeMeAStat, setMakeMeAStat} = props
    const { addMeal, getMeals, meals, mealId, fullMeal, setFullMeal, getDubs, dubs, setMealId } = useContext(MealContext)
    console.log(meal)
    // const [wutId, setwutId] = useState({
    //     name: '',
    //     stat: '',
    //     mealId: meal._id
    // })
    //set meal id for rendering statgen in hey//meal componet

    useEffect(() => {
        console.log(`meal id use effect fired`, meal)
        setMealIdNow(meal)
        setNewStat(prevInputs => ({
            ...prevInputs,
            mealId: meal
        }))
        //get meals? to update front end
        // getMeals()
    },[])

    const clear = () => {
        console.log(`in clear comp newStat:`, newStat)
        setStats(prev => ([
                ...prev,
                {
                    name: newStat.name,
                    value: newStat.value,
                    mealId: meal,
                    track: newStat.track
                }
        ]))
        if(createStat){
            setCreateStat(false)
            return 
        }
        setMealIdNow('')
        setNewStat('')
        setMealId('')
        if(setNewM){
            setNewM(false)
        }
        if(makeMeAStat){
            setMakeMeAStat(false)
            return
        }
        
        // getMeals()
    }

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(event)
        //setFullMeals stats
        
        setFullMeal((prevFullMeal) =>
        prevFullMeal.map((prev) => {
            if (prev._id === meal) {
                return {
                    ...prev,
                    stats: [...prev.stats, newStat] // Add the new stat to the stats array
                };
            } else {
                return prev;
            }
        })
    );
    }

    const handleCheck = () => {
        console.log(`CHECKED BRUV`)
        setTracked()
    }
    
    return (
        <div>
            <form onSubmit={submit}>
                <input
                    type='text'
                    name='name'
                    value={newStat.name}
                    placeholder='Name'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='value'
                    value={newStat.value}
                    placeholder='Stat'
                    onChange={handleChange}
                />
                <input
                    type='checkbox'
                    checked={newStat.track}
                    name='track'
                    value={newStat.track}
                    onChange={handleCheck}
                />Stat 
                <button>SMASHED</button>
            </form>
            <button onClick={clear}>All done ⚡</button>
        </div>
    )
}

export default StatGen