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

    
    const [newStat, setNewStat] = useState({
        name: '',
        stat: '',
        mealId: ''
    })
    const [mealId, setMealId] = useState('')

    const setMealIdNow = (id) => {
        setMealId(id)
    }
    

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(`Name: ${name} Value: ${value}`)
        setNewStat({
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        statAxios.post('./api/stat', newStat)
            .then(res => console.log(`inside addStat result:`, res))
            .catch(err => console.log(err))
        setNewStat({
            name: '',
            stat: ''
        })
    }

    

    return (

        <StatContext.Provider
            value={{
                handleSubmit,
                mealId,
                setMealIdNow,
                handleChange,
                newStat, 
                setNewStat
            }}>
            { props.children }
        </StatContext.Provider>

    )
}

export { StatProvider, StatContext }


