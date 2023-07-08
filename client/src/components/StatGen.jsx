import React, { useState } from 'react'
import axios from 'axios'

const StatGen = () => {

    const [newStat, setNewStat] = useState({
        name: '',
        stat: ''
    })

    const addStat = () => {
        axios.post('./statId', newStat)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const [name, value] = e.target
        setNewStat({
            [name]: value
        })
    }

    return (
        <form onSubmit={addStat}>
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
        </form>
    )
}

export default StatGen