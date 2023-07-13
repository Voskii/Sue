import React, { useState } from "react";
import axios from 'axios'
const StatContext = React.createContext()

const statAxios = axios.create()

statAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})



export default function StatProvider(props){

    
    
    const [mealId, setMealId] = useState('')
    const [stats, setStats] = useState([])

    const [newStat, setNewStat] = useState({
        name: '',
        value: '',
        mealId: mealId
    })

    const setMealIdNow = (id) => {
        setMealId(id)
        setNewStat(prevInputs => ({
            ...prevInputs,
            mealId: id
        }))
    }
    

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(`Name: ${name} Value: ${value}`)
        setNewStat(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(`inside handle sub`, newStat)
        
        statAxios.post('/api/stat', newStat)
            .then(res => 
                console.log(`inside addStat result:`, res)
                )
            .catch(err => console.log(err))
        
        setNewStat({
            name: '',
            value: '',
            mealId: mealId
        })
    }

    const getStats = (id) => {
        statAxios.get(`/api/stat/${id}`)
        
            .then(res => {
                setStats(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    
    console.log(`inside stat context:`, newStat)
    return (

        <StatContext.Provider
            value={{
                handleSubmit,
                mealId,
                setMealIdNow,
                handleChange,
                newStat, 
                setNewStat,
                stats,
                setStats,
                getStats
            }}>
            { props.children }
        </StatContext.Provider>

    )
}

export { StatProvider, StatContext }


