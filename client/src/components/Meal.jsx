import React, { useState } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'

const Meal = (props) => {

    const {meal, stats, cleanUp, setStats, noBro, mealClicked, track, statMe, showStats} = props
    
    const [checked, setChecked] = useState(false)

    console.log(`inside meal comp, stats:`, stats)

    

    // const letsMakeAStat = () => {
    //     setCreateStat(true)
    // }

    const check = () => {

        setChecked(!checked)
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
            <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal