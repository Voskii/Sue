import React, { useState, useContext } from 'react'
import { MealContext } from '../context/MealProvider.jsx'


export default function Counter(props){
    // const {} = useContext(MealContext)
    const {addPrioStat, thisStat, setThisStat, tStats} = props
    console.log(`inside counter comp`, tStats)
    

    // main stat and sub stat, main stat renders on Hey page
    // user main stat selected and added to user model
    //put request to update userstate with prioritizedd stat
    // get request for all trackable stats from user in getDubs call
    // [favStat, setFavStat] = useState('')

    return (
        <div>
            <h1>chosen stat</h1> 
        </div>
    )
}