import React, { useState } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'

const Meal = (props) => {

    const {meal, stats, cleanUp, setStats, noBro, mealClicked, track, statMe, showStats, getStats, fullMeal} = props
    console.log(fullMeal)
    const [checked, setChecked] = useState(false)

    console.log(`inside meal comp, stats:`, stats)

    

    // const letsMakeAStat = () => {
    //     setCreateStat(true)
    // }

    const check = (fish) => {
        getStats(fish._id)
        setChecked(!checked)
        track(meal)
    }

    return (
        <div>
            {showStats?
                <div>
                    <h2 onClick={()=>cleanUp(meal)}>{meal.name}</h2>
                    {statMe}
                    <button onClick={''}>+Stat?</button>
                </div>
            :
                <h2 onClick={()=>mealClicked(meal)}>{meal.name}</h2>
            }
            <div onClick={()=>check(meal)}>{checked? '👀':'✨'}</div>
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal