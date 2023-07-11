import React, { useState } from "react";
import axios from 'axios'
const MealContext = React.createContext()

const mealAxios = axios.create()

mealAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function MealProvider(props){

    const [meals, setMeals] = useState([])

    
    // function getUserTodos(){
    //     mealAxios.get("/api/todo/user")
    //         .then(res => {
    //             setUserState(prev => ({
    //                 ...prev,
    //                 todos: res.data
    //             }))
    //         })
    //         .catch(err => console.log(err))
    // }
    const getMeals = () => {
        mealAxios.get("/api/meal/user")
            .then(res => {
                setMeals(res.data)
            })
            .catch(err => console.log(err))
    }

    function addMeal(newMeal){
        mealAxios.post('/api/meal', newMeal)
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (

        <MealContext.Provider
            value={{
                addMeal,
                getMeals,
                meals,
                setMeals
            }}>
            { props.children }
        </MealContext.Provider>

    )
}

export { MealProvider, MealContext }