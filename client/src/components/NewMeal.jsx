import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MealContext } from '../context/MealProvider'
import StatGen from './StatGen'
import { useEffect } from 'react'
import BACK from '../images/Return.png'

export default function NewMeal(props) {

    const { addMeal, newMeal, setUserIdNow, mealId, handleChange, handleSubmit, thisMeal } = useContext(MealContext)
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
            {newMeal.name && <div className='create-meal-name'>{newMeal.name}</div>}
            {!mealName && !newMeal.name && !mealId && <div className='create-meal-name'>Add Meal</div>}
                {!mealId &&
                    <form onSubmit={submit} style={{textAlign: 'center', padding: '0px 0px 10px 0px', justifyContent: 'space-between'}}>
                        <input 
                            name='name'
                            type='text'
                            value={newMeal.name}
                            placeholder='Meal Name'
                            onChange={handleChange}
                            required={true}
                        />
                        <input 
                            name='imgUrl'
                            type='text'
                            value={newMeal._imgUrl}
                            placeholder='Image URL Address'
                            onChange={handleChange}
                        />
                        <div style={{padding:'10px', display: 'flex'}}>
                            <div className='add-meal-butt' onClick={() => setNewM(false)}><img src={BACK} style={{width: '20px', padding: '4px'}} /></div><button className='add-meal-butt'>Next</button>
                        </div>
                    </form>
                }
            {mealId && <div className='create-meal-name' style={{padding: '5px'}}>{thisMeal.name}</div>}
            {mealId && <StatGen meal={mealId} setNewM={setNewM} setStats={setStats} hideCounts={false} />}
        </div>
    )
}

