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
        eatWhen: 1,
        imgUrl: '',
        mealCount: [],
        stats: [{
            name:'',
            value:'',
            track: false
            }]
    }])
    const [thisMeal, setThisMeal] = useState({})
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
            imgUrl: '',
            eatWhen: 1
    })

    const [counterStats, setCounterStats] = useState({
        protein: 0,
        calories: 0,
        sugar: 0,
        fat: 0,
        mealId: '',
        _id:''
    })

    const [newCounter, setNewCounter] = useState({
        protein: 0,
        calories: 0,
        sugar: 0,
        fat: 0,
        mealId: ''
    })

    const [userCounts, setUserCounts] = useState('')

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

    const handleCounterChange = (e) => {
        console.log('counter', newCounter)
        const {name, value} = e.target
        console.log('name:', name, 'value:', value)
        setNewCounter(prevInputs => ({
            ...prevInputs,
            [name]: Number(value)
        }))
    }

    

    const handleSubmit = () => {
        addMeal(newMeal)
        setThisMeal(newMeal)
        setNewMeal({
            name: '',
            user: userId,
            imgUrl: '',
            eatWhen: 1
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
                    eatWhen: meal.eatWhen,
                    imgUrl: meal.imgUrl
                };
    
                const [mealCountResponse, statResponse] = await Promise.all([
                    counterAxios.get(`/api/counter/${meal._id}`),
                    statAxios.get(`/api/stat/${meal._id}`)
                ]);
    
                const mealCount = mealCountResponse.data;
                const stats = statResponse.data.map(stat => ({
                    name: stat.name,
                    value: stat.value,
                    track: stat.track,
                    _id: stat._id
                }));
    
                return {
                    ...mealData,
                    mealCount,
                    stats
                };
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
            const dubResponse = await dubAxios.get(`/api/dub/user/${user._id}`)
            const counterRequests = dubResponse.data.map(dub => {
                return counterAxios.get(`/api/counter/${dub.mealId}`).then(res => res.data)
            })

            const counts = await Promise.all(counterRequests)
            console.log('DUB RESPONSE DATA:', dubResponse.data)
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
            //check this add in counts to dubPromises
            const dubsPromises = dubResponse.data.map((dub,index) => ({
                name: dub.name,
                mealId: dub.mealId,
                user: dub.user,
                stats: dub.stats,
                eatWhen: dub.eatWhen,
                _id: dub._id,
                imgUrl: dub.imgUrl,
                mealCount: counts[index]
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
        console.log('addMeal context newMEal:', newMeal)
        try {
            const res = await mealAxios.post('/api/meal', newMeal)
        setMealId(res.data._id)
        setNewCounter(prevInputs => ({
            ...prevInputs,
            mealId: res.data._id
        }))
        setMeals((prev) => [
            ...prev,
            {
                mealCount: [],
                mealId: res.data._id,
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
        console.log('ADD COUNTER:',eatenDub, 'counterStats', counterStats)
        try {
            // Update counterStats state
            setCounterStats((prev) => ({
                protein: prev.protein + (eatenDub.mealCount[0].protein || 0),
                calories: prev.calories + (eatenDub.mealCount[0].calories || 0),
                sugar: prev.sugar + (eatenDub.mealCount[0].sugar || 0),
                fat: prev.fat + (eatenDub.mealCount[0].fat || 0),
                _id: prev._id,
                mealId: ''
            }))
    
            // Perform side effect (API call) immediately after updating the state
            const updateCounterStats = async () => {
                try {
                    // Make PUT request with the updated counterStats
                    const updateCounter = await counterAxios.put(`/api/counter/user/${eatenDub.user}`, eatenDub.mealCount[0])
                    const yaya = updateCounter.data
                    console.log('yayaPut', yaya)
                    
                    // Delete the eatenDub after updating the counter
                    delDub(eatenDub)
                } catch (err) {
                    console.log(err)
                }
            }
    
            // Call the function for updating counterStats
            updateCounterStats()
            delDub(eatenDub)
        } catch (err) {
            console.log(err)
        }
    };

    const addNewCounterStats = async () => {
        try{
            const counts = await counterAxios.post('/api/counter', newCounter)
            const allCounts = counts.res
            console.log(allCounts)
            setMeals((prev) =>
                prev.map((prev) => {
                if (prev._id === newCounter.mealId) {
                    return {
                        ...prev,
                        mealCount: [newCounter] // Add the new stat to the stats array
                    };
                } else {
                    return prev;
            }}))
            setNewCounter({
                protein: Number(0),
                calories:Number(0),
                sugar: Number(0),
                fat: Number(0),
                mealId: ''
            })
            
            
        } catch(err){
            console.log(err)
        }
    }

    const addToMealCounterStats = async (thisOne, theseCounts) => {
        console.log('A2M NewCounter:',newCounter, 'counterStats', counterStats, 'thisOne:', thisOne, 'theseCounts', theseCounts)
        try {
            // Update counterStats state
            // setMeals((prev) =>
            //     prev.map((prevMeal) => {
            //     if (prevMeal._id === thisOne) {
            //         return {
            //             ...prev,
            //             mealCount: {
            //                 protein: prev.protein + newCounter.protein,
            //                 calories: prev.calories + newCounter.calories,
            //                 sugar: prev.sugar + newCounter.sugar,
            //                 fat: prev.fat + newCounter.fat
            //             } // Add the new stat to the stats array
            //         };
            //     } else {
            //         return prev;
            // }}))
    
            // Perform side effect (API call) immediately after updating the state
            const updateCounterStats = async () => {
                try {
                    // MAKE PUT REQ TO MEAL COUNTER NOT USER
                    const updateCounter = await mealAxios.put(`/api/counter/${thisOne}`, newCounter)
                    const yaya = updateCounter.data
                    console.log('CounterUpdate', yaya)
                    
                    
                    
                } catch (err) {
                    console.log(err)
                }
            }
    
            // Call the function for updating counterStats
            updateCounterStats()
            setNewCounter(prev=>({
                protein: Number(0),
                calories:Number(0),
                sugar: Number(0),
                fat: Number(0),
                mealId: prev.mealId
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const getUserCounts = async (thatGuy) => {
        console.log(`getUserCounts thatGuy:`, thatGuy)
        try{
            const counts = await counterAxios.get(`/api/counter/user/${thatGuy._id}`)
            const allCounts = counts.data
            // if(allCounts === undefined){

            // } else {
                
            // }
            setCounterStats(allCounts[0])
            console.log('USER COUNTS get:', allCounts)
        } catch(err){
            console.log(err)
        }
    }

    const delCounts = async () => {
        console.log('inside delCOUNTS:', counterStats)
        try{
            const buhByeCounts = await counterAxios.delete(`/api/counter/${counterStats._id}`)
            const peace = buhByeCounts.data
            console.log(peace)
            setCounterStats((prev) => ({
                protein: '',
                calories: '',
                sugar: '',
                fat: '',
                mealId: '',
                _id: prev._id
            }))
        } catch(err){
            console.log(err)
        }
    }

    const updateMealsMap = (updateThisId, newInfo) => {
        console.log('UMM id:', updateThisId, 'newstat:', newInfo)
        setMeals((prev) =>
        prev.map((prev) => {
            if (prev.mealId === updateThisId) {
                return {
                    ...prev,
                    stats: [...prev.stats, newInfo] // Add the new stat to the stats array
                };
            } else {
                return prev;
            }
        })
    )
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
                counterStats,
                handleCounterChange,
                newCounter,
                setNewCounter,
                addNewCounterStats,
                getUserCounts,
                userCounts,
                delCounts,
                updateMealsMap,
                thisMeal,
                addToMealCounterStats
            }}>
            { props.children }
        </MealContext.Provider>

    )
}

export { MealProvider, MealContext }