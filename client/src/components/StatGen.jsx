import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StatContext } from '../context/StatProvider'

const StatGen = (props) => {

    const { handleSubmit, setMealIdNow, handleChange, newStat, setNewStat, newMeal, setTracked } = useContext(StatContext)
    const { meal, setNewM, setCreateStat, createStat, setStats, makeMeAStat, setMakeMeAStat } = props
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
        if(setNewM){
            setNewM(false)
        }
        
        setMakeMeAStat(false)
    }

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(event)
        
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
                />
                <button>SMASHED</button>
            </form>
            <button onClick={clear}>All done ⚡</button>
        </div>
    )
}

export default StatGen