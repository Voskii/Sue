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

    

    const [userId, setUserId] = useState('')
    const [mealId, setMealId] = useState('')

    const setUserIdNow = (id) => {
        setUserId(id)
    }

    const [newMeal, setNewMeal] = useState({
            name: '',
            user: userId,
            _img: ''
        })

    const handleChange = (e) => {
        const  {name, value}  = e.target
        console.log(`Name: ${name} Value: ${value}`)
        setNewMeal(prev => {
            return ({
                ...prev,
                [name]:value
            })
        })
    }

    const handleSubmit = () => {
        addMeal(newMeal)
        // Mealaxios.post('./api/meal', newMeal)
        //     .then(res => console.log(`post meal func:`, res))
        //     .catch(res => console.log(res))
    }
    
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
            .then(res => {
                console.log(res)
                setMealId(res.data._id)
                setMeals(prev => [
                    ...prev,
                    {
                        name: res.data.name,
                        imgUrl: res.data.imgUrl,
                        user: res.data.user,
                        stats: res.data.stats,
                        _id: res.data._id
                    }
                    
                ])
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (

        <MealContext.Provider
            value={{
                addMeal,
                getMeals,
                meals,
                setMeals,
                handleChange,
                handleSubmit,
                newMeal,
                setNewMeal,
                setUserIdNow,
                userId,
                mealId
            }}>
            { props.children }
        </MealContext.Provider>

    )
}

export { MealProvider, MealContext }