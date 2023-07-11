import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MealContext } from '../context/MealProvider'
import StatGen from './StatGen'

export default function NextMeal(props) {

    const { addMeal } = useContext(MealContext)
    const { setNewM, user } = props
    console.log(`user:`, user)
    const [next, setNext] = useState(true)
    // const mapMe = data.map()
    const [newMeal, setNewMeal] = useState({
        name: '',
        user: user._id,
        _img: ''
    })

    const handleChange = (e) => {
        const  {name, value}  = e.target
        console.log(`Name: ${name} Value: ${value}`)
        setNewMeal({
            [name]: value
        })
    }

    const fish = (e) => {
        e.preventDefault()
        console.log(`anger`)
        addMeal(newMeal)
        // Mealaxios.post('./api/meal', newMeal)
        //     .then(res => console.log(`post meal func:`, res))
        //     .catch(res => console.log(res))
        setNext(false)
    }

    return (

        <div className='new-meal'>
            {newMeal.name ? <h1>Meal: {newMeal.name}</h1> : <h1>New Meal</h1>}
                {next &&
                    <form onSubmit={fish}>
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
            {!next && <StatGen meal={newMeal} setNewM={setNewM}/>}
        </div>
    )
}

