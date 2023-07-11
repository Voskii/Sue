import React, { useState } from 'react'
import axios from 'axios'

const StatGen = (props) => {

    const { meal, setNewM } = props
    const [newStat, setNewStat] = useState({
        name: '',
        stat: '',
        mealId: meal._id
    })

    const addStat = (event, newS) => {
        event.preventDefault()
        axios.post('./statId', newS)
            .then(res => console.log(`inside addStat result:`, res))
            .catch(err => console.log(err))
            // setNewM(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(`Name: ${name} Value: ${value}`)
        setNewStat({
            [name]: value
        })
    }

    return (
        <form onSubmit={() => addStat(newStat)}>
                <input
                    type='text'
                    name='name'
                    value={newStat.name}
                    placeholder='Name'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='stat'
                    value={newStat.stat}
                    placeholder='Stat'
                    onChange={handleChange}
                />
                <button>SMASHED</button>
        </form>
    )
}

export default StatGen