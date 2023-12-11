const express = require('express')
const counterRouter = express.Router()
const Counter = require("../models/counter.js")

//Get all counts
counterRouter.get("/", async (req, res, next) => {
    try{
        const counts = await Counter.find()
        return res.status(200).send(counts)
    }
    catch (err) {
        res.status(500)
        return next(err)
    }
})

// Get by Meal
// counterRouter.get("/:mealId", (req, res, next) => {
//     Stat.find({ mealId : req.params.mealId }, (err, Stat) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(Stat)
//     })
// })
// GET COUNTS BY MEAL
counterRouter.get('/:mealId', async (req, res, next) => {
    try{
       
        const counts = await Counter.find({ mealId: req.params.mealId})
         console.log('COUNTER DATA GET CALL', counts)
        return res.status(200).send(counts)
    }
    catch(err){
        next(err)
    }
})

// GET COUNTS BY USER
counterRouter.get('/user/:userId', async (req, res, next) => {
    try{
        const counts = await Counter.find({ userId: req.params.userId})
        return res.status(200).send(counts)
    }
    catch(err){
        next(err)
    }
})

//Post one
counterRouter.post("/", (req, res, next) => {
    const newCounter = new Counter(req.body)
    newCounter.save((err, savedCounter) => {
        if(err){
            res.status(500)
            return next(err)
        }
    return res.status(201).send(savedCounter)
    })
})

// delete function
counterRouter.delete("/:statId", async (req, res, next) =>{
    Counter.findByIdAndDelete({_id: req.params.statId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item:${deletedItem} from the database.`)
    })
})

//update one stat
counterRouter.put("/:statId" , (req, res, next) => {
    Stat.findOneAndUpdate(
        {_id : req.params.statId},
        req.body,
        {new: true},
        (err, updatedStat) => {
            if(err){
                res.status(500)
                return next(err)
            }
            //.send(updatedCard) is causing 500 error due to having numbers in a property
        return res.status(201).send(`Card has been updated.`)
        }
    )
})

module.exports = counterRouter