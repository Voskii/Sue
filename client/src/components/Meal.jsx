import React, { useState } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'

const Meal = (props) => {

    const {meal, cleanUp, noBro, mealClicked, track, showStats, fullMeal, setStats, setNewM, stats} = props
    console.log(`fullmeal inside mealcomp:`, fullMeal)
    const [checked, setChecked] = useState(false)
    const [makeMeAStat, setMakeMeAStat] = useState(false)

    const statMe = meal.stats?.map(item => item.track && <Stat key={item._id} info={item} track={true}/>)
    const ingredientMe = meal.stats?.map(item => !item.track && <Stat key={item._id} info={item} track={true}/>)



    const letsMakeAStat = () => {
        setMakeMeAStat(true)
    }

    const check = (fish) => {
        
        setChecked(!checked)
        track(fish)
    }

    return (
        <div>
            {showStats?
                <div>
                    <h2 onClick={()=>cleanUp(meal)}>{meal.name}</h2>
                        <div className='both-stats'>
                            <div className="stat-tracked">
                                <h6 className="stat-colors">Stat</h6>
                                {statMe}
                            </div>

                            <div className="stat-untracked">
                                <h6 className='stat-colors'>Ingredient</h6>
                                {ingredientMe}
                            </div>
                        </div>
                        
                    
                        {makeMeAStat? 
                            <StatGen makeMeAStat={makeMeAStat} setMakeMeAStat={setMakeMeAStat} meal={meal.mealId} setStats={setStats} setNewM={setNewM}/>
                        :
                            <button onClick={()=>letsMakeAStat()}>+Stat?</button>
                        }

                </div>
            :
                <h2 onClick={()=>mealClicked(meal)}>{meal.name}</h2>
            }
            <div onClick={()=>check(meal)}>{checked? '👀':'✨'}</div> 
            {/* {'move this to meals component'} */}
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal