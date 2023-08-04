import React, { useState } from "react";
import axios from 'axios'
const MealContext = React.createContext()

const mealAxios = axios.create()

mealAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const statAxios = axios.create()

statAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const dubAxios = axios.create()

dubAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function MealProvider(props){

    const [meals, setMeals] = useState([])
    const [fullMeal, setFullMeal] = useState([{
        name: '',
        mealId: '',
        user:'',
        stats: [{
            name:'',
            value:'',
            track: false
            }]
    }])
    

    const [userId, setUserId] = useState('')
    const [mealId, setMealId] = useState('')
    const [dubs, setDubs] = useState([])
    const [tStats, setTStats] = useState([])

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
    // const getMeals = () => {
    //     console.log(`get meals func called`)
    //     mealAxios.get("/api/meal/user")
    //         .then(res => {
    //             setMeals(res.data)
    //             res.data.map(meal => {
    //                 setFullMeal(prev => [{
    //                     ...prev,
    //                     name: meal.name,
    //                     mealId: meal._id,
    //                     user: meal.user
    //                 }])
    //                 statAxios.get(`/api/stat/${meal._id}`)
    //                 .then(res => {
    //                     console.log(`getStats:stats`, res.data)
    //                     setFullMeal(prev => [{
    //                         ...prev,
    //                         stats: res.data.map(stat => [{
    //                             name: stat.name,
    //                             value: stat.value,
    //                             track: stat.track
    //                         }])
    //                     }])
    //                 })
    //             })
    //         })
    //     .catch(err => console.log(err))
    // }

    const getMeals = async () => {
        console.log('get meals func called');
    
        try {
            const mealResponse = await mealAxios.get("/api/meal/user");
            const meals = mealResponse.data;
    
            const fullMealsPromises = meals.map(async meal => {
                const mealData = {
                    name: meal.name,
                    mealId: meal._id,
                    user: meal.user,
                };
    
                try {
                    const statResponse = await statAxios.get(`/api/stat/${meal._id}`);
                    const stats = statResponse.data.map(stat => ({
                        name: stat.name,
                        value: stat.value,
                        track: stat.track
                    }));
    
                    return {
                        ...mealData,
                        stats
                    };
                } catch (err) {
                    console.error("Error fetching stats", err);
                    return mealData;  // Return meal data even if stats fetch failed.
                }
            });
    
            const fullMeals = await Promise.all(fullMealsPromises);
            setMeals(meals);
            setFullMeal(fullMeals);
        } catch (err) {
            console.log(err);
        }
    };

    const getDubs = async (user) => {
        console.log(`get dubs func`, user)
        try {

            const dubResponse = await dubAxios.get(`api/dub/user/${user._id}`)
            console.log(dubResponse)
            
            // 
            dubResponse.data.map(dub => {
                dub.stats.map(stat => {
                    console.log(`stat`, stat)
                    setTStats( prev => ([
                        ...prev,
                        {
                            name: stat.name, 
                            value: stat.value, 
                            track: stat.track
                        }
                    ]))
                })
                
            })

            // setTStats(prev=> [...prev, ...newTStats])
            
            const dubsPromises = dubResponse.data.map(dub => ({
                name: dub.name,
                mealId: dub.mealId,
                user: dub.user,
                stats: dub.stats
            }))
            const fullDubs = await Promise.all(dubsPromises)
            setDubs(fullDubs)
        } catch (err) {
            console.log(err)
        }
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
    console.log(`mealcontext tstats`, tStats)
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
                mealId,
                fullMeal,
                setFullMeal,
                getDubs,
                dubs,
                tStats
            }}>
            { props.children }
        </MealContext.Provider>

    )
}

export { MealProvider, MealContext }