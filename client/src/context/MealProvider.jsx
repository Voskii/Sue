import React, { useState } from "react";
import axios from 'axios'
const MealContext = React.createContext()

const mealAxios = axios.create()

mealAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const counterAxios = axios.create()

counterAxios.interceptors.request.use(config => {
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

const favAxios = axios.create()

favAxios.interceptors.request.use(config=>{
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
        eatWhen: '',
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
    
    const [counterStats, setCounterStats] = useState({
        protein: 0,
        calories: 0,
        sugar: 0
    })

    const setUserIdNow = (id) => {
        setUserId(id)
    }

    const [newMeal, setNewMeal] = useState({
            name: '',
            user: userId,
            _img: ''
    })

    const handleChange = (e) => {
        const  {name, value} = e.target
        console.log(`Name: ${name} Value: ${value}`)
        setNewMeal(prev => {
            return ({
                ...prev,
                [name]:value
            })
        })
    }

    const handleCounterchange = (e) => {
        const {name, value} = e.target
    }

    const handleSubmit = () => {
        addMeal(newMeal)
        setNewMeal({
            name: '',
            user: userId,
            _img: ''
    })
        // Mealaxios.post('./api/meal', newMeal)
        //     .then(res => console.log(`post meal func:`, res))
        //     .catch(res => console.log(res))
    }

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
                        track: stat.track,
                        _id: stat._id
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
            setMeals(fullMeals);
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
            dubResponse.data.map(dub => {
                dub.stats.map(stat => {
                    console.log(`stat`, stat)
                    if(stat.track){
                        setTStats(prev => ([
                        ...prev,
                        {
                            name: stat.name, 
                            value: stat.value, 
                            track: stat.track
                        }
                    ]))
                    }
                })
                
            })

            const dubsPromises = dubResponse.data.map(dub => ({
                name: dub.name,
                mealId: dub.mealId,
                user: dub.user,
                stats: dub.stats,
                eatWhen: dub.eatWhen,
                _id: dub._id
            }))
            const fullDubs = await Promise.all(dubsPromises)
            setDubs(fullDubs)
        } catch (err) {
        console.log(err)
    }
    }
    const delDub = (deleteThis) => {
        console.log('delDub:', deleteThis)
        dubAxios.delete(`/api/dub/${deleteThis._id}`)
            .then(res => console.log(res.data))
            .then(err => console.log(err))
            setDubs(dubs.filter(dub => dub._id === deleteThis._id ? '' : dub))
    }
    // function addMeal(newMeal){
    //     mealAxios.post('/api/meal', newMeal)
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
    //     }
    const addMeal = async (newMeal) => {
        try {
            const res = await mealAxios.post('/api/meal', newMeal)
        console.log(res)
        setMealId(res.data._id)
        setMeals((prev) => [
            ...prev,
            {
                name: res.data.name,
                imgUrl: res.data.imgUrl,
                user: res.data.user,
                stats: res.data.stats,
                _id: res.data._id
            }
        ])
        } catch(err) {
            console.log(err.response.data.errMsg)
    }
}
    console.log(`mealcontext tstats`, tStats)

    const deleteMeal = (deleteThis) => {
        console.log(`to delete:`, deleteThis)
        //FISH UNDEFINED
        //delete meal and stats lol
        
        deleteThis.stats.map(stat=> {
            statAxios.delete(`/api/stat/${stat._id}`)
                .then(res=>console.log('stat delete', res.data))
                .then(err=>console.log(err))
        })
        mealAxios.delete(`/api/meal/${deleteThis.mealId}`)
            .then(res => console.log(res.data))
            .then(err => console.log(err))
        //update front end 
        setMeals(meals.filter(meall => meall.mealId === deleteThis.mealId ? '' : meall))
    }

    const newFav = (thisOne) => {
        favAxios.post('/api/fav', thisOne)
            .then(res => console.log(res.data))
    }

    const addCounterStats = async (eatenDub) => {
        try {
            const counts = await counterAxios.post('/api/counter')
            const allCounts = counts.res
            console.log('inside addCounterStats:', allCounts)

            setCounterStats(prev => ({
                protein: prev.protein + eatenDub.protein,
                calories: prev.calories + eatenDub.calories,
                sugar: prev.sugar + eatenDub.sugar
            }));

            console.log(allCounts)
            delDub(eatenDub)
        } catch (err) {
            console.log(err)
        }
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
                mealId,
                setMealId,
                fullMeal,
                setFullMeal,
                getDubs,
                dubs,
                tStats,
                newFav,
                deleteMeal,
                delDub,
                addCounterStats,
                counterStats
            }}>
            { props.children }
        </MealContext.Provider>

    )
}

export { MealProvider, MealContext }