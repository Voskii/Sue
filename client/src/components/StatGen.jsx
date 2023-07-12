import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StatContext } from '../context/StatProvider'

const StatGen = (props) => {

    const { handleSubmit, setMealIdNow, handleChange, newStat, setNewStat } = useContext(StatContext)
    const { meal, setNewM } = props

    const [wutId, setwutId] = useState({
        name: '',
        stat: '',
        mealId: meal._id
    })

    useEffect(() => {
        setMealIdNow(wutId.mealId)
    },[])

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            <button onClick={() => setNewM(false)}>All done ⚡</button>
        </div>
    )
}

export default StatGen