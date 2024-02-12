import React, { useState, useContext } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'
import { MealContext } from '../context/MealProvider'
import { StatContext } from '../context/StatProvider'
import YATHATONE from '../images/Check.png'
import TRASH from '../images/Remove.png'
import ADDD from '../images/Joyent.png'

const Meal = (props) => {

    const {cleanUp, noBro, mealClicked, track, showStats, setNewM, updateMealsMap, meal} = props
    const { getStats, stats, setStats, newStat } = useContext(StatContext)
    const [checked, setChecked] = useState(false)
    const [makeMeAStat, setMakeMeAStat] = useState(false)
    const { deleteMeal, counterStats, meals, newCounter } = useContext(MealContext)
    
    const demCounts = meals.filter(meall=>meall.mealId === meal.mealId?meall.mealCount:'')
    // const statMe = meal.stats.map(item => <Stat key={item._id} info={item} track={true} whiteOut={true}/>)
    console.log(`MealCOMP meals:`, meals, 'meal', meal, 'demCounts', demCounts, 'newCounter:', newCounter)
    // const ingredientMe = meal.stats?.map(item => !item.track && <Stat key={item._id} info={item} track={true} whiteOut={false}/>)
    const [mealCounts, setMealCounts] = useState({
        calories: meal.mealCount[0]?.calories || 0,
        protein: meal.mealCount[0]?.protein || 0,
        fat: meal.mealCount[0]?.fat || 0,
        sugar: meal.mealCount[0]?.sugar || 0
    })

    const [allStats, setAllStats] = useState(meal.stats)

    const updateDemCounts = () => {
        setMealCounts((prev) => ({
            protein: prev.protein + newCounter.protein,
            calories: prev.calories + newCounter.calories,
            sugar: prev.sugar + newCounter.sugar,
            fat: prev.fat + newCounter.fat
        }))

    }

    const updateDemStats = () => {
        console.log('UPDTESTATS newstat:', newStat, 'allStats:', allStats)
        setAllStats((prev)=>[...prev, newStat])
    }
    // setCounterStats((prev) => ({
    //     protein: prev.protein + (eatenDub.mealCount[0].protein || 0),
    //     calories: prev.calories + (eatenDub.mealCount[0].calories || 0),
    //     sugar: prev.sugar + (eatenDub.mealCount[0].sugar || 0),
    //     fat: prev.fat + (eatenDub.mealCount[0].fat || 0),
    //     _id: prev._id,
    //     mealId: ''
    // }))


    const check = (fish) => {
        
        setChecked(!checked)
        track(fish)
    }
    console.log('ALLSTATS:',allStats)

    return (
        <div className=''>
            {showStats?
                <div className='show-meal'>
                    <div onClick={()=>cleanUp(meal)} style={{textDecoration: 'underline', padding: '5px'}}>{meal.name}</div>
                        {meal.imgUrl && <img src={meal.imgUrl} className='meal-image'/>}
                        <div className='both-stats'>

                            <div className="stat-untracked">
                                <h6 className='stat-colors' style={{padding:'5px', textDecoration: 'underline'}}>Ingredient</h6>
                                {allStats?.map(item => <Stat key={item._id} info={item} track={true} whiteOut={true} isMealCard={true}/>)}
                            </div>

                            {/* <div className="stat-tracked">
                                <h6 className="stat-colors">Stat</h6>
                                {statMe}
                            </div> */}

                            <div className='counter-container-meal'>
                                <span>Calories</span>
                                <div style={{color: 'var(--lr)'}}>{mealCounts.calories}</div>
                                <span>Protein</span>
                                <div style={{color: 'var(--lr)'}}>{mealCounts.protein}</div>
                                <span>FAT</span>
                                <div style={{color: 'var(--lr)'}}>{mealCounts.fat}</div>
                                <span>Sugar</span>
                                <div style={{color: 'var(--lr)'}}>{mealCounts.sugar}</div>
                            </div>
                        </div>
                        
                        {makeMeAStat? 
                            <StatGen makeMeAStat={true} setMakeMeAStat={setMakeMeAStat} meal={meal.mealId} setStats={setStats} setNewM={setNewM} updateMealsMap={updateMealsMap} isAddToMeal={true} thatMeal={meal} updateDemCounts={updateDemCounts} updateDemStats={updateDemStats}/>
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