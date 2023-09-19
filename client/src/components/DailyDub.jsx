import React, { useState, useContext, useEffect } from 'react'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
// import ForceUpdateMethod from './components/ForceUpdateMethod.jsx'
import axios from 'axios'

const DailyDub = (props) => {
// stat map, add values together for the day, back end storage for total stats vs max stats for the day, contains array of selected user meals
// setStats code will need to be stats for value tracking items only
    const { mealss, onDeck, generate, user, setTrackedMeals} = props
    const { addMeal, getMeals, meals, mealId, dubs, getDubs } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub, addDubStat, handleSubmit } = useContext(DubContext)
    const [disOne, setDisOne] = useState('')
//render tracked meals on load?
    const mapMe = mealss.map(meal => (<h3 key={meal._id}>{meal.name}</h3>))
    console.log(`inside DailyDub:dub`, dub, `mealss:`, mealss)

    const addDubs = () => {
        console.log(`DD Submit:dub`, dub, `stats:`, stats, 'mealss:', mealss)
        handleSubmit(mealss)
        setTrackedMeals([])

        // this.forceUpdate()
    }

    useEffect(() => {

        getDubs(user)

    },[])
    //UPDATE CHOSEN VALUE FOR TIME OF MEAL RESUME HERE
    const handleChange = (event) => {
        const {name, value} = event.target
        setDisOne()
    }

    const options = ['1','2','3','4','5']
    //giant if statement that tracks users wanted actions PER TRACKED MEAL when creating
    const dubMe = dubs?.map((dub, index) => (<h3 key={index}>{dub.name}</h3>))
    const trackMe = mealss?.map((dub, index) => 
        <div key={index}>
            <h5>{dub.name}</h5>
            <select onChange={handleChange}>
                <option>Eat When?</option>
                {options.map(option => <option>{option}</option>)}
            </select>
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
                        {dubMe}
                </>
            }
            {onDeck && mealss &&
                <>
                    <h3>On Deck Meals</h3>
                        {dubMe}
                    <button>ATE IT</button>
                </>
            }
        </div>
    )
}

export default DailyDub