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
        handleSubmit()
        
    }

    return (

        <div className='new-meal'>
            {newMeal.name ? <h1>Meal: {newMeal.name}</h1> : <h1>New Meal</h1>}
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
            {mealId && <StatGen meal={mealId} setNewM={setNewM} setStats={setStats} />}
        </div>
    )
}

