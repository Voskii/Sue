import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import { DubContext } from '../context/DailyDubProvider'
import { UserContext } from '../context/UserProvider'
import NewMeal from './NewMeal'
import StatGen from './StatGen'
import Meal from './Meal'
import Stat from './Stat'
import DailyDub from './DailyDub'


const Meals = (props) => {
    const {location} = props
    const { user } = useContext(UserContext)
    const { addMeal, getMeals, meals, mealId, fullMeal, getDubs, dubs, setMeals } = useContext(MealContext)
    const { getStats, stats, setStats } = useContext(StatContext)
    const { dub, setDub} = useContext(DubContext)
    const [ newM, setNewM ] = useState(false)
    
    const [ showStats, setShowStats ] = useState(false)

    useEffect(() => {
        getMeals()
        getDubs(user)
    },[])

    const [chosen, setChosen] = useState('')
    const [trackedMeals, setTrackedMeals] = useState([])
    const [tracking, setTracking] = useState(false)
    const [createStat, setCreateStat] = useState(false)

    const mealClicked = (meal) => {
        console.log(`meal clicked`)
        if(!showStats){
            setChosen(meal)
        }
        setShowStats(!showStats)
    }

    const track = (meal) => {
        console.log(`inside track func`, meal)
        console.log(stats)
        setTracking(!tracking)
        setTrackedMeals(prev => [
            ...prev,
            meal
        ])
    }

    const cleanUp = () => {
        setShowStats(false)
        setChosen('')
    }

    const mapMe = meals.map(meal => {
        return (
            <div >
                {createStat? 
                    <StatGen key={meal._id} setCreateStat={setCreateStat} createStat={createStat} meal={meal._id} setStats={setStats} setNewM={false} stats={meal.stats} getMeals={getMeals} /> 
                :
                    <Meal key={meal._id} noBro={true} meal={meal} mealClicked={mealClicked} track={track} setShowStats={setShowStats} showStats={showStats} setNewM={false} stats={meal.stats} meals={meals} setMeals={setMeals}/>
                }
            </div>
        )
    }) 
    console.log(`trackedMeals bottom of comp`, trackedMeals)
    return (
        <div className=''>
            {/* <Link to="/" className='hey-span'>Hey</Link> */}
            {/* {!newM && <button onClick={() => setNewM(!newM)}>+ Meal?</button>} */}
            {newM ?
                <NewMeal setNewM={setNewM} user={user} setStats={setStats} />
            :
                <div>
                    {chosen? 
                        <div>
                            <Meal key={chosen._id} onClick={cleanUp} meal={chosen} cleanUp={cleanUp} setShowStats={setShowStats} showStats={showStats} track={track} getStats={getStats} setStats={setStats} meals={meals} thisMeal={true}/>
                        </div>
                    :
                    <div className='hey-meals-dd'>
                        <ul className='map-scroll'>
                            {mapMe}
                        </ul>
                        <div>
                            {dubs && <DailyDub trackedMeals={trackedMeals} setTrackedMeals={setTrackedMeals} generate={true} stats={stats} getStats={getStats} getDubs={getDubs} dubs={dubs} />}
                        </div>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default Meals