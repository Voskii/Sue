import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { MealContext } from '../context/MealProvider.jsx'
import { StatContext } from '../context/StatProvider.jsx'
import { FavContext } from '../context/FavProvider.jsx'



export default function Counter(props){
    const { tStats, user, dubs, counterStats } = useContext(MealContext)
    const { thisStat, setThisStat, addPrioStat } = useContext(StatContext)
    const { getFav } = useContext(FavContext)
    const {comp, newFav, stats} = props
    console.log(`inside counter comp stats:`, tStats, 'comp?:', comp, user)
    console.log(`counterstats`, counterStats)

    //write a useEffect to call for getFav for users fav stat
    useEffect(() => {

        // getFav(user)
    },[])
    // track users most important stat of the day in back end? The following logic is for that
    // const [chosen, setChosen] = useState('')

    // const iChooseYou = (thisOne) => {
    //     setChosen(thisOne.name)
    //     newFav(thisOne)
    // }

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', padding: '10px'}}>
            <div><span style={{color: 'whitesmoke'}}>Calories: </span>{counterStats?.calories || 0}</div>
            <div><span style={{color: 'whitesmoke'}}>Protein: </span>{counterStats?.protein || 0}</div>
            <div><span style={{color: 'whitesmoke'}}>FAT: </span>{counterStats?.fat || 0}</div>
            <div><span style={{color: 'whitesmoke'}}>Sugar: </span>{counterStats?.sugar || 0}</div>
        </div>
    )
}