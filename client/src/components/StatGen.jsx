import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StatContext } from '../context/StatProvider'
import { MealContext } from '../context/MealProvider'

const StatGen = (props) => {

    const { handleSubmit, setMealIdNow, handleChange, newStat, setNewStat, newMeal, setTracked, getStats, setStats } = useContext(StatContext)
    const { meal, setNewM, setCreateStat, createStat, makeMeAStat, setMakeMeAStat, hideCounts} = props
    
    const { addMeal, getMeals, meals, setMeals, updateMealsMap, mealId, fullMeal, setFullMeal, getDubs, dubs, setMealId, handleCounterChange, counterStats, newCounter, addNewCounterStats, thisMeal  } = useContext(MealContext)
    console.log(meal, 'thisMeal:', thisMeal)
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
        //get meals? to update front end
        // getMeals()
    },[])

    const clear = () => {
        console.log(`in clear comp newStat:`, newStat)
        if(!hideCounts){
            addNewCounterStats()
        }
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
        setNewStat('')
        setMealId('')
        if(setNewM){
            setNewM(false)
        }
        if(makeMeAStat){
            setMakeMeAStat(false)
            return
        }
        
        // getMeals()
    }

    const submit = (event) => {
        event.preventDefault()
        handleSubmit(event)
        //setFullMeals stats
        updateMealsMap(meal, newStat)
        // setMeals((prev) =>
        // prev.map((prev) => {
        //     if (prev._id === meal) {
        //         return {
        //             ...prev,
        //             stats: [...prev.stats, newStat] // Add the new stat to the stats array
        //         };
        //     } else {
        //         return prev;
        //     }
        // })
        // )
    }

    const handleCheck = () => {
        console.log(`CHECKED BRUV`)
        setTracked()
    }
    
    return (
        <div>
            <form onSubmit={submit}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '10px', justifyContent: 'center', alignItems: 'center', gap: '7px'}}>
                        {thisMeal.imgUrl && <img src={thisMeal.imgUrl} className='meal-image'/>}
                        <input
                        type='text'
                        name='name'
                        value={newStat.name}
                        placeholder='Name'
                        onChange={handleChange}
                        style={{transform: 'scale(.9)'}}
                        />
                        <input
                            type='text'
                            name='value'
                            value={newStat.value}
                            placeholder='Stat'
                            onChange={handleChange}
                            style={{transform: 'scale(.9)'}}
                        />
                        {/* <input
                            type='checkbox'
                            checked={newStat.track}
                            name='track'
                            value={newStat.track}
                            onChange={handleCheck}
                        />  */}
                        <button style={{width: 'fit-content'}}>Add Ingredients</button>
                    </div>
                    {hideCounts ?
                    ''
                    :
                    <div className='counter-addMeal-container'>
                        <span>Total</span>
                        <span style={{color: 'whiteSmoke', fontSize: '.6em'}}>Fill out once</span>
                        <span>Calories</span>
                        <input
                            type='number'
                            name='calories'
                            value={newCounter.calories}
                            placeholder='Calories'
                            onChange={handleCounterChange}
                        />
                        <span>Protein</span>
                        <input
                            type='number'
                            name='protein'
                            value={newCounter.protein}
                            placeholder='Protein'
                            onChange={handleCounterChange}
                        />
                        <span>FAT</span>
                        <input
                            type='number'
                            name='fat'
                            value={newCounter.fat}
                            placeholder='⚡'
                            onChange={handleCounterChange}
                        />
                        <span>Sugar</span>
                        <input
                            type='number'
                            name='sugar'
                            value={newCounter.sugar}
                            placeholder='Sugar'
                            onChange={handleCounterChange}
                        />
                    </div>
                    }
                </div>
            </form>
            <button onClick={clear}>Add Meal ⚡</button>
        </div>
    )
}

export default StatGen