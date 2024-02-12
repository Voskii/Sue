import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StatContext } from '../context/StatProvider'
import { MealContext } from '../context/MealProvider'
import addM from '../images/Joyentred.png'
import BACK from '../images/Return.png'

const StatGen = (props) => {

    const { handleSubmit, setMealIdNow, handleChange, newStat, setNewStat, newMeal, setTracked, getStats, setStats } = useContext(StatContext)
    const { meal, setNewM, setCreateStat, createStat, makeMeAStat, setMakeMeAStat, hideCounts, isAddToMeal, thatMeal, updateDemCounts, updateDemStats} = props
    
    const { addMeal, getMeals, meals, setMeals, updateMealsMap, mealId, fullMeal, setFullMeal, getDubs, dubs, setMealId, handleCounterChange, counterStats, newCounter, addNewCounterStats, addToMealCounterStats, thisMeal  } = useContext(MealContext)
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
        addNewCounterStats()
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

    const addToMeal = (event) => {
        console.log('ADD2MEAL - meal:',meal,'newStat:',newStat,'thatMEal:',thatMeal)
        updateDemCounts()
        if(newStat.name){
            updateDemStats()
        }
        handleSubmit(event, isAddToMeal)
        //setFullMeals stats
        addToMealCounterStats(meal, thatMeal.mealCount[0])
        updateMealsMap(meal, newStat)
        
        setStats(prev => ([
                ...prev,
                {
                    name: newStat.name,
                    value: newStat.value,
                    mealId: meal,
                    track: newStat.track
                }
        ]))
        
        
        setNewStat('')
    }

    
    return (
        <div className=''>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', padding: '10px', justifyContent: 'center', alignItems: 'center', gap: '7px'}}>
                        {thisMeal.imgUrl && <img src={thisMeal.imgUrl} className='meal-image'/>}
                        <form onSubmit={submit}>
                            <input
                                type='text'
                                name='name'
                                value={newStat.name}
                                placeholder='Name'
                                onChange={handleChange}
                                style={{transform: 'scale(.9)'}}
                                required
                            />
                            <input
                                type='text'
                                name='value'
                                value={newStat.value}
                                placeholder='Stat'
                                onChange={handleChange}
                                style={{transform: 'scale(.9)'}}
                                required
                            />
                        {/* <input
                            type='checkbox'
                            checked={newStat.track}
                            name='track'
                            value={newStat.track}
                            onChange={handleCheck}
                        />  */}
                        
                        {!isAddToMeal && <div style={{padding:'5px'}}><button className='add-ingredients-butt'><img src={addM}/><div style={{fontSize: '1em'}}>Add Ingredient</div></button></div>}
                        </form>
                    </div>
                    <div className='bottom-newMeal-comp'>
                        <div style={{textAlign: 'center', textDecoration: 'underline 1px', color: 'whitesmoke'}}>
                            {!isAddToMeal ? 
                                <>
                                    <div style={{padding: '0px 5px 5px 5px', color: 'whitesmoke'}}>Total:</div>
                                    <div style={{color: 'whiteSmoke', fontSize: '.6em', paddingBottom: '8px'}}>( Fill out once )</div>
                                </>
                            :
                                <>
                                    <div style={{padding: '0px 5px 5px 5px', color: 'whitesmoke'}}>Amount to add:</div>
                                    <div style={{color: 'whiteSmoke', fontSize: '.6em', paddingBottom: '8px'}}>( Fill out for each Item )</div>
                                </>
                            }
                        </div>
                        <div className='counter-addMeal-container'>
                            <form onSubmit={submit} >
                                <div className='counter-value-flex'>
                                    <div className='counter-row'>
                                        <>Calories:</>
                                        <input
                                            type='number'
                                            name='calories'
                                            value={newCounter.calories}
                                            placeholder=''
                                            onChange={handleCounterChange}
                                            className='add-meal-counters'
                                        />
                                    </div>
                                    <div className='counter-row'>
                                        <>FATS:</>
                                        <input
                                            type='number'
                                            name='fat'
                                            value={newCounter.fat}
                                            placeholder=''
                                            onChange={handleCounterChange}
                                            className='add-meal-counters'
                                        />
                                    </div>
                                </div>
                                <div className='counter-value-flex'>
                                    <div className='counter-row-pro'>
                                        <>Protein:</>
                                        <input
                                        type='number'
                                        name='protein'
                                        value={newCounter.protein}
                                        placeholder=''
                                        onChange={handleCounterChange}
                                        className='add-meal-counters'
                                        />
                                    </div>
                                    <div className='counter-row'>
                                        <>Sugar:</>
                                        <input
                                            type='number'
                                            name='sugar'
                                            value={newCounter.sugar}
                                            placeholder=''
                                            onChange={handleCounterChange}
                                            className='add-meal-counters'
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <div style={{paddingBottom:'15px', marginTop: '-25px'}}>
                {!isAddToMeal ? 
                    <button className='add-ingredients-butt' onClick={clear}>
                        <img src={addM}/>
                        <div style={{fontSize: '1em'}}>Add Meal</div>
                    </button>
                    :
                    <>
                        <div style={{display: 'flex', justifyContent: 'center', padding:''}}>
                            <img src={BACK} style={{width: '20px', padding: '8px'}} className='add-meal-butt' onClick={() => setMakeMeAStat(false)}/>
                            <button className='add-meal-butt' onClick={()=> addToMeal()}>Add Ingredient</button>  
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default StatGen