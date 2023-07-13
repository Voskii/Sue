import React, { useState } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'

const Meal = (props) => {

    const {meal, stats, cleanUp, setStats, noBro, checked, setChecked, mealClicked, track} = props
    const [createStat, setCreateStat] = useState(false)
    

    console.log(`inside meal comp, stats:`, stats)

    const mapMe =  stats?.map(item => <Stat info={item} />)

    const letsMakeAStat = () => {
        setCreateStat(true)
    }

    return (
        <div>
            {createStat?
                <StatGen setCreateStat={setCreateStat} createStat={createStat} meal={meal._id} setStats={setStats}/>
            :!noBro &&
            <div>
                <h2 onClick={cleanUp}>{meal.name}</h2>
                {mapMe}
                {!noBro &&<button onClick={letsMakeAStat}>+Stat?</button>}
            </div>
            }
            {noBro && 
                <div>
                    <h2 onClick={()=>mealClicked(meal)}>{meal.name}</h2>
                    <div onClick={track}>{checked? '👀':'✨'}</div>
                </div>}
        </div>
    )
}
{/* <div onClick={()=>track(meal)}>{checked? '👀':'✨'}</div>  */}
export default Meal