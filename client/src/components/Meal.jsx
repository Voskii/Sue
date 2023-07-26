import React, { useState } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'

const Meal = (props) => {

    const {meal, cleanUp, noBro, mealClicked, track, showStats, fullMeal} = props
    console.log(fullMeal)
    const [checked, setChecked] = useState(false)


    const statMe = fullMeal.stats?.map(item => <Stat key={item._id} info={item} />)

    // const letsMakeAStat = () => {
    //     setCreateStat(true)
    // }

    const check = (fish) => {
        
        setChecked(!checked)
        track(fish)
    }

    return (
        <div>
            {showStats?
                <div>
                    <h2 onClick={()=>cleanUp(fullMeal)}>{meal.name}</h2>
                    {statMe}
                    <button onClick={''}>+Stat?</button>
                </div>
            :
                <h2 onClick={()=>mealClicked(fullMeal)}>{meal.name}</h2>
            }
            <div onClick={()=>check(fullMeal)}>{checked? '👀':'✨'}</div>
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal