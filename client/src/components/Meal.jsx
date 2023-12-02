import React, { useState, useContext } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'
import { MealContext } from '../context/MealProvider'

const Meal = (props) => {

    const {meal, cleanUp, noBro, mealClicked, track, showStats, meals, setStats, setNewM, stats} = props
    console.log(`MealCOMP meals:`, meals, 'meal:', meal)
    const [checked, setChecked] = useState(false)
    const [makeMeAStat, setMakeMeAStat] = useState(false)
    const { deleteMeal } = useContext(MealContext)
    const statMe = meal.stats?.map(item => item.track && <Stat key={item._id} info={item} track={true} whiteOut={true}/>)
    const ingredientMe = meal.stats?.map(item => !item.track && <Stat key={item._id} info={item} track={true} whiteOut={false}/>)


    const check = (fish) => {
        
        setChecked(!checked)
        track(fish)
    }

    return (
        <div>
            {showStats?
                <div>
                    <div onClick={()=>cleanUp(meal)}>{meal.name}</div>
                        <div className='both-stats'>

                            <div className="stat-untracked">
                                <h6 className='stat-colors'>Ingredient</h6>
                                {ingredientMe}
                            </div>

                            <div className="stat-tracked">
                                <h6 className="stat-colors">Stat</h6>
                                {statMe}
                            </div>

                            
                        </div>
                        
                        {makeMeAStat? 
                            <StatGen makeMeAStat={true} setMakeMeAStat={setMakeMeAStat} meal={meal.mealId} setStats={setStats} setNewM={setNewM}/>
                        :
                            <button onClick={()=>setMakeMeAStat(!makeMeAStat)}>+Stat?</button>
                        }

                </div>
            :
                <div onClick={()=>mealClicked(meal)}>{meal.name}</div>
            }
            {!showStats && 
                <>
                    <span onClick={()=>check(meal)}>{checked? '👀':'✨'}</span>
                    <span><button onClick={()=>deleteMeal(meal)}>✖</button></span>
                    </>
            }
            
            {/* {'move this to meals component'} */}
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal