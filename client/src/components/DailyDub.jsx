import React, { useState, useContext, useEffect } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
// import ForceUpdateMethod from './components/ForceUpdateMethod.jsx'
import axios from 'axios'


const DailyDub = (props) => {
// stat map, add values together for the day, back end storage for total stats vs max stats for the day, contains array of selected user meals
// setStats code will need to be stats for value tracking items only
    const { trackedMeals, onDeck, generate, user, setTrackedMeals} = props
    const { addMeal, getMeals, meals, mealId, dubs, getDubs, delDub, addCounterStats } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub, addDubStat, handleSubmit, handleChangeMealTime } = useContext(DubContext)
//render tracked meals on load?
    // const mapMe = trackedMeals.map(meal => (<h3 key={meal._id}>{meal.name}</h3>))
    console.log(`inside DailyDub:dub`, dubs, `trackedMeals:`, trackedMeals)

    const addDubs = (e) => {
        
        console.log(`DD Submit:dub`, dub, `stats:`, stats, 'trackedMeals:', trackedMeals)
        handleSubmit(trackedMeals)
        setTrackedMeals([])

        // this.forceUpdate()
    }

    useEffect(() => {

        getDubs(user)

    },[])

    const handleChangeMealTimee = (index, selectedTime) => {
        console.log('index:', index, 'selectedTime:', selectedTime)
        setTrackedMeals(prev=> {
            return prev.map((meal, i) => {
                if(i===index){
                    return {
                        ...meal,
                        eatWhen: selectedTime
                    }
                }
                return meal 
            })
    })
    }
    

    const options = ['1','2','3','4','5']
    //giant if statement that tracks users wanted actions PER TRACKED MEAL when creating
    // const dubMe = dubs?.map((dubb, index) => dubb.eatWhen > dubb[-1].eatWhen ? (<h3 key={index} style={{color: 'aqua'}}>{dubb.name}</h3>) : '')

    const fishMe = dubs?.sort((a, b) => {
        //sort array then render with map
        console.log('inside dubs sort - dubs:', dubs)
        if (a.eatWhen === undefined || b.eatWhen === undefined) {
            return 0; // No sorting if eatWhen is undefined
        }
        // Assuming eatWhen is of type string or number
        return a.eatWhen - b.eatWhen;
    })
    .map((dubb, index) =>
        dubb.eatWhen !== undefined ? (
            <div key={index} style={{ color: 'aqua' , padding: '15px'}}>
                {dubb.name}
                {generate && <button onClick={()=>delDub(dubb)}>X</button>}
            </div>
        ) : null
    );

    const delThisTrackedOne = (meal, index) => {
        console.log('delete tracked clicked', meal)
        setTrackedMeals(trackedMeals.filter((mealss) => mealss.mealId === meal.mealId ? "" : mealss))
    }
            //how the hell is tracked meals working when tracked meals = Allmeals????
    const trackMe = trackedMeals?.map((dub, i) => 
            
        <div key={i}>
            {console.log('dub:', dub, 'index:', i)}
            <div style={{color: 'whiteSmoke'}}>{dub.name}</div>
            <h6>Eat When?</h6>
            <span><select onChange={(event)=>handleChangeMealTimee(i, event.target.value)}>
                {options.map(option => <option>{option}</option>)}
            </select></span><span><button onClick={() => delThisTrackedOne(dub, i)}>✖</button></span>
        </div>
    )

    return (
        <div className='daily-dub-container'>
            {generate && 
                <>
                    <h3>To Track</h3>
                        {trackMe}
                    <form onSubmit={addDubs}>
                        <button>TRACK ME</button>
                        {/* {'-get, update frontend'} */}
                    </form>
                    
                    <h3>Tracking</h3>
                        {fishMe}
                </>
            }
            {onDeck &&
                <>
                    {dubs.length > 0 ? <h3 style={{textAlign: 'center', paddingBottom: '25px', color: 'whitesmoke', fontSize: '1.8em'}}>On Deck Meals</h3> : <h3 style={{textAlign: 'center', paddingBottom: '25px', color: 'whitesmoke', fontSize: '1.8em'}}>Currently 0 Meals</h3>}
                        {fishMe}
                    {dubs.length > 0 && <button onClick={()=>addCounterStats(dubs[0])}>ATE IT</button>}
                </>
            }
        </div>
    )
}

export default DailyDub