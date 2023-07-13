import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StatContext } from '../context/StatProvider'

const StatGen = (props) => {

    const { handleSubmit, setMealIdNow, handleChange, newStat, setNewStat, newMeal } = useContext(StatContext)
    const { meal, setNewM, setCreateStat, createStat, setStats } = props
    console.log(meal)
    // const [wutId, setwutId] = useState({
    //     name: '',
    //     stat: '',
    //     mealId: meal._id
    // })
    

    useEffect(() => {
        console.log(`meal id use effect fired`)
        setMealIdNow(meal)
        setNewStat(prevInputs => ({
            ...prevInputs,
            mealId: meal
        }))
    },[])

    const clear = () => {
        console.log(`in clear comp newStat:`, newStat)
        setStats(prev => ([
                ...prev,
                {
                    name: newStat.name,
                    value: newStat.value,
                    mealId: meal
                }
        ]))
        if(createStat){
            setCreateStat(false)
            return 
        }
        setMealIdNow('')
        setNewM(false)
    }

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(event)
        
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
                <button>SMASHED</button>
            </form>
            <button onClick={clear}>All done ⚡</button>
        </div>
    )
}

export default StatGen