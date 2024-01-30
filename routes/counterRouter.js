const express = require('express')
const counterRouter = express.Router()
const Counter = require("../models/counter.js")
const mongoose = require('mongoose')

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
        console.log('COUNTER DATA GET CALL - meals', counts)
        return res.status(200).send(counts)
    }
    catch(err){
        next(err)
    }
})

// GET COUNTS BY USER
counterRouter.get('/user/:userId', async (req, res, next) => {
    try{
        
        const userId = req.params.userId
        console.log('get user, userId:', userId)
        const counts = await Counter.find({ userId: userId })
        console.log('COUNTS:', counts)
        if(counts.length === 0){
            const newCounter = new Counter({ userId: userId })
            await newCounter.save()
            return res.status(201).send(newCounter)
        }
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

counterRouter.put("/:mealId", async (req, res, next) => {
    try{
        console.log('INSIDE COUNTPUT req:', req)
        const mealId = req.params.mealId
        const incrementBy = req.body// Object containing key-value pairs to increment properties
            console.log('MEAL PUT')
        const filter = { mealId }
        const update = { $inc: {} } // Initialize the update object with an empty $inc property
    
        for (const [key, value] of Object.entries(incrementBy)) {
            if (typeof value === "number") {
            update.$inc[key] = value
            } else {
            console.warn(`Property '${key}' is not a number and will not be incremented.`)
            }
        }
            const options = { new: true, upsert: true }
            const counter = await Counter.findOneAndUpdate(filter, update, options)
    
            return res.status(200).json({ message: "Counter updated successfully", counter })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" })
        }
})

// counterRouter.post("/user/:userId", (req, res, next) => {
//     const newCounter = new Counter(req.body)
//     newCounter.save((err, savedCounter) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//     return res.status(201).send(savedCounter)
//     })
// })
//MONGOOSE 6.12
// counterRouter.put("/user/:userId", async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         const incrementBy = req.body; // Object containing key-value pairs to increment properties
//         console.log('counterRouter PUT req.body:',req.body)
//         // Find the counter associated with the user or create a new one if it doesn't exist
//         let counter = await Counter.findOne({ userId });

//         // if (!counter) {
//         //     counter = new Counter({ userId });
//         // }

//         // Increment properties based on the incoming key-value pairs
//         for (const [key, value] of Object.entries(incrementBy)) {
//             if (typeof value === "number") {
//             update.$inc[key] = value
//             } else {
//             console.warn(`Property '${key}' is not a number and will not be incremented.`)
//             }
//         };

//         // Save the updated counter
//         await counter.save();

//         return res.status(200).json({ message: 'Counter updated successfully', counter });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// })
counterRouter.put("/user/:userId", async (req, res, next) => {
    try {
    const userId = req.params.userId
    const incrementBy = req.body// Object containing key-value pairs to increment properties
        console.log('USER PUT')
    const filter = { userId }
    const update = { $inc: {} } // Initialize the update object with an empty $inc property

    for (const [key, value] of Object.entries(incrementBy)) {
        if (typeof value === "number") {
        update.$inc[key] = value
        } else {
        console.warn(`Property '${key}' is not a number and will not be incremented.`)
        }
    }
        const options = { new: true, upsert: true }
        const counter = await Counter.findOneAndUpdate(filter, update, options)

        return res.status(200).json({ message: "Counter updated successfully", counter })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" })
    }
})

// delete function
counterRouter.delete("/:counterId", async (req, res, next) =>{
    // console.log('DELETE req.params', req.params)
    Counter.findByIdAndDelete({_id: req.params.counterId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item:${deletedItem} from the database.`)
    })
})

//update one stat
// counterRouter.put("/:statId" , (req, res, next) => {
//     Stat.findOneAndUpdate(
//         {_id : req.params.statId},
//         req.body,
//         {new: true},
//         (err, updatedStat) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             //.send(updatedCard) is causing 500 error due to having numbers in a property
//         return res.status(201).send(`Card has been updated.`)
//         }
//     )
// })

module.exports = counterRouter