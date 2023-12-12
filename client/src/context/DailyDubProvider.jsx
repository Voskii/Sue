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

    const [disOne, setDisOne] = useState('')

    const [dub, setDub] = useState([{
        name: '',
        mealId: '',
        user:'',
        eatWhen: '',
        stats: [{
            name:'',
            value:'',
            track: Boolean
        }],
        mealCount: [{
            
        }]
    }])

    // const addDubStat = (stats) => {
    //     console.log(`inside dubStat:stats:`, stats)
    //     setDub(prev => [{
    //         ...prev,
    //         stats: stats
    //         }
    //     ])
        
    // }
    
    // const addDubMealStat = (meal) => {
    //     console.log(`inside dubMealStat:meal:`, meal)
    //     setDub(prev => [{
    //         ...prev,
    //         name: meal.name,
    //         mealId: meal._id,
    //         user: meal.user
    //         }
    //     ])
    // }
    
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
            console.log('handlesub', meal)
            dubAxios.post(`/api/dub`, meal)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })
    }

    //UPDATE CHOSEN VALUE FOR TIME OF MEAL RESUME HERE
    // const handleChangeMealTime = (event) => {
    //     console.log('MealTime:', event.target)
    //     const {name, value} = event.target
    //     // setDisOne(value)
    //     setDub(prev =>[{
            
    //         eatWhen: value
    //     }])
    // }
    
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
    console.log('bottom of dub component:', dub)
    return (

        <DubContext.Provider
            value={{
                handleChange,
                handleSubmit,
                dub,
                setDub
            }}>
            { props.children }
        </DubContext.Provider>

    )
}

export { DailyDubProvider, DubContext }