import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MealContext } from '../context/MealProvider'
import StatGen from './StatGen'
import { useEffect } from 'react'

export default function NewMeal(props) {

    const { addMeal, newMeal, setUserIdNow, mealId, handleChange, handleSubmit } = useContext(MealContext)
    const { setNewM, user, setStats } = props
    console.log(`user:`, user)
    const [next, setNext] = useState(true)
    
    useEffect(()=>{
        setUserIdNow(user._id)
    },[])

    const submit = (e) => {
        e.preventDefault()
        setMealName(newMeal.name)
        handleSubmit()
        
    }

    const [mealName, setMealName] = useState('')

    return (

        <div className='new-meal'>
            {newMeal.name ? <h1>Meal: {newMeal.name}</h1> : <div className='create-meal-name'>{mealName}</div>}
            {!mealName && <div className='create-meal-name'>New Meal</div>}
                {!mealId &&
                    <form onSubmit={submit}>
                        <input 
                            name='name'
                            type='text'
                            value={newMeal.name}
                            placeholder='Meal Name'
                            onChange={handleChange}
                        />
                        <input 
                            name='_img'
                            type='text'
                            value={newMeal._img}
                            placeholder='image url?'
                            onChange={handleChange}
                        />
                        <button>SMASH MEAL</button>
                    </form>
                }
            {mealId && <StatGen meal={mealId} setNewM={setNewM} setStats={setStats} hideCounts={false}/>}
        </div>
    )
}

