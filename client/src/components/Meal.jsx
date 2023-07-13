import React, { useState } from 'react'
import Stat from './Stat'
import StatGen from './StatGen'

const Meal = (props) => {

    const {meal, stats, cleanUp, setStats} = props
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
            :
            <div>
                <h2 onClick={cleanUp}>{meal.name}</h2>
                {mapMe}
                <button onClick={letsMakeAStat}>+Stat?</button>
            </div>
            }
        </div>
    )
}

export default Meal