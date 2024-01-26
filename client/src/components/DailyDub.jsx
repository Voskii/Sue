import React, { useState, useContext, useEffect } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
import forkknife from '../images/forkknife.png'
import ateIt from '../images/ateIt.png'
import axios from 'axios'
import TRASH from '../images/Remove.png'


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
            <div key={index} style={{ color: 'whitesmoke' , lineHeight: '40px', fontSize: '1.6em'}}>
                {generate ? 
                    <span style={{display: 'flex', justifyContent:'space-between', padding: '5', fontSize: '.7em'}} ><div style={{paddingLeft:'3px'}}>{dubb.name.charAt(0).toUpperCase() + dubb.name.slice(1).toLowerCase()}</div><img src={TRASH} onClick={()=>delDub(dubb)}/></span>
                :
                    <div>{dubb.name.charAt(0).toUpperCase() + dubb.name.slice(1).toLowerCase()}</div>
                }
            </div>
        ) : null
    );

    const delThisTrackedOne = (meal, index) => {
        console.log('delete tracked clicked', meal)
        setTrackedMeals(trackedMeals.filter((mealss) => mealss.mealId === meal.mealId ? "" : mealss))
    }
            
    const trackMe = trackedMeals?.map((dub, i) => 
            
        <div key={i}>
            {console.log('dub:', dub, 'index:', i)}
            <div style={{color: 'whiteSmoke'}}>{dub.name}</div>
            <h5 style={{color: 'var(--w)'}}># Meal of Day?</h5>
            <div style={{display:'flex', justifyContent: 'center'}} className='custom-select'>
                <select onChange={(event)=>handleChangeMealTimee(i, event.target.value)}>
                    {options.map(option => <option>{option}</option>)}
                </select>
                <img src={TRASH} onClick={() => delThisTrackedOne(dub, i)}/>
            </div>
        </div>
    )

    return (
        <div className={generate? '' : 'daily-dub-container'}>
            {generate && 
                <div>
                    <div className='to-track'>
                        <h3 style={{color:'whitesmoke', textDecoration: 'underline'}}>To Track</h3>
                            {trackMe}
                        <form onSubmit={addDubs} style={{paddingTop: '5px'}}>
                            <button className='ateit-butt'>Track All</button>
                            {/* {'-get, update frontend'} */}
                        </form>
                    </div>
                    <div className='actually-tracked'>
                        <h3 style={{color:'var(--ws)', textDecoration: 'underline', paddingBottom: '10px'}}>On Deck</h3>
                            {fishMe}
                    </div>
                </div>
            }
            {onDeck &&
                <>
                    {dubs.length > 0 ? <h3 style={{display: 'flex', justifyContent: 'center', textDecoration: 'underline 1px', paddingTop: '10px', color: 'whitesmoke', fontSize: '1.8em'}}><span><img src={forkknife}/></span>ON DECK</h3> : <h3 style={{textAlign: 'center', paddingBottom: '25px', color: 'whitesmoke', fontSize: '1.8em'}}>Currently 0 Meals</h3>}
                        {fishMe}
                    {dubs.length > 0 && <div style={{paddingTop:'5px', paddingBottom: '20px'}}><button onClick={()=>addCounterStats(dubs[0])} className='ateit-butt'><img src={ateIt}/><div style={{fontSize: '1.5em'}}>Ate It All</div></button></div>}
                </>
            }
        </div>
    )
}

export default DailyDub