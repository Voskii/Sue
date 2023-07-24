import React, { useState } from "react";
import axios from 'axios'
const DubContext = React.createContext()

const dubAxios = axios.create()

dubAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function DailyDubProvider(props){

    const [dub, setDub] = useState([{
        name: '',
        mealId: '',
        user:'',
        stats: [{
            name:'',
            value:'',
            track: Boolean
            }]
    }])

    const addDubStat = (stats) => {
        console.log(`inside dubStat:stats:`, stats)
        setDub(prev => [{
            ...prev,
            stats: stats
            }
        ])
        
    }
    
    const addDubMealStat = (meal) => {
        console.log(`inside dubMealStat:meal:`, meal)
        setDub(prev => [{
            ...prev,
            name: meal.name,
            mealId: meal._id,
            user: meal.user
            }
        ])
    }
    
    // const handleChange = (e) => {
    //     const  {name, value}  = e.target
    //     console.log(`Name: ${name} Value: ${value}`)
    //     setNewMeal(prev => {
    //         return ({
    //             ...prev,
    //             [name]:value
    //         })
    //     })
    // }

    const handleSubmit = (meals) => {
        meals.map(meal=>{
            axios.post(`./api/dub`, meal)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })
    }
    
    const handleChange = () => {
        
    }
    // const getMeals = () => {
    //     dubAxios.get("/api/meal/user")
    //         .then(res => {
    //             setMeals(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }

    // function addMeal(newMeal){
    //     dubAxios.post('/api/meal', newMeal)
    //         .then(res => {
    //             console.log(res)
    //             setMealId(res.data._id)
    //             setMeals(prev => [
    //                 ...prev,
    //                 {
    //                     name: res.data.name,
    //                     imgUrl: res.data.imgUrl,
    //                     user: res.data.user,
    //                     stats: res.data.stats,
    //                     _id: res.data._id
    //                 }
                    
    //             ])
    //         })
    //         .catch(err => console.log(err.response.data.errMsg))
    // }

    return (

        <DubContext.Provider
            value={{
                handleChange,
                handleSubmit,
                dub,
                setDub,
                addDubStat,
                addDubMealStat
            }}>
            { props.children }
        </DubContext.Provider>

    )
}

export { DailyDubProvider, DubContext }