import axios from 'axios'
import React, { useState } from 'react'
import StatGen from './StatGen'

export default function NextMeal(props) {
    const { setNewM } = props

    // const mapMe = data.map()
    const [newMeal, setNewMeal] = useState({
        name: '',
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
    }

    return (

        <div className='next-meal'>
            <h1>NewMeal</h1>
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
                        placeholder='Have an Image?'
                        onChange={handleChange}
                    />
                    <button>SMASH MEAL</button>
                </form>
            <StatGen />
            <button onClick={() => setNewM(false)}>SMASHED</button>
        </div>
    )
}

