import React, { useState, useContext } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import YATHATONE from '../images/Check.png'
import TRASH from '../images/Remove.png'
import ADDD from '../images/Joyent.png'

const Meal = (props) => {

    const {meal, cleanUp, noBro, mealClicked, track, showStats, meals, setNewM, updateMealsMap} = props
    const { getStats, stats, setStats } = useContext(StatContext)
    console.log(`MealCOMP meals:`, meals, 'meal:', meal)
    const [checked, setChecked] = useState(false)
    const [makeMeAStat, setMakeMeAStat] = useState(false)
    const { deleteMeal, counterStats } = useContext(MealContext)
    const statMe = meal.stats?.map(item => <Stat key={item._id} info={item} track={true} whiteOut={true}/>)
    // const ingredientMe = meal.stats?.map(item => !item.track && <Stat key={item._id} info={item} track={true} whiteOut={false}/>)



    const check = (fish) => {
        
        setChecked(!checked)
        track(fish)
    }

    return (
        <div className=''>
            {showStats?
                <div className='show-meal'>
                    <div onClick={()=>cleanUp(meal)} style={{textDecoration: 'underline', padding: '5px'}}>{meal.name}</div>
                        {meal.imgUrl && <img src={meal.imgUrl} className='meal-image'/>}
                        <div className='both-stats'>

                            <div className="stat-untracked">
                                <h6 className='stat-colors' style={{padding:'5px', textDecoration: 'underline'}}>Ingredient</h6>
                                {meal.stats?.map(item => <Stat key={item._id} info={item} track={true} whiteOut={true} isMealCard={true}/>)}
                            </div>

                            {/* <div className="stat-tracked">
                                <h6 className="stat-colors">Stat</h6>
                                {statMe}
                            </div> */}

                            <div className='counter-container-meal'>
                                <span>Calories</span>
                                <div style={{color: 'var(--lr)'}}>{meal.mealCount[0].calories}</div>
                                <span>Protein</span>
                                <div style={{color: 'var(--lr)'}}>{meal.mealCount[0].protein}</div>
                                <span>FAT</span>
                                <div style={{color: 'var(--lr)'}}>{meal.mealCount[0].fat}</div>
                                <span>Sugar</span>
                                <div style={{color: 'var(--lr)'}}>{meal.mealCount[0].sugar}</div>
                            </div>
                        </div>
                        
                        {makeMeAStat? 
                            <StatGen makeMeAStat={true} setMakeMeAStat={setMakeMeAStat} meal={meal.mealId} setStats={setStats} setNewM={setNewM} updateMealsMap={updateMealsMap} isAddToMeal={true} thisMeal={meal}/>
                        :
                            <button onClick={()=>setMakeMeAStat(!makeMeAStat)}>Edit?</button>
                        }

                </div>
            :
                <div onClick={()=>mealClicked(meal)} style={{padding: '5px', textDecoration: 'underline'}}>{meal.name}</div>
            }
            {!showStats && 
                <div className='triggers'>
                    <div onClick={()=>check(meal)}>{checked? <img src={YATHATONE} /> : <img src={ADDD}/>}</div>
                    <div><div onClick={()=>deleteMeal(meal)}><img src={TRASH}/></div></div>
                </div>
            }
            
            {/* {'move this to meals component'} */}
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal