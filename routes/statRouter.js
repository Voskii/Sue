const express = require('express')
const statRouter = express.Router()
const Stat = require("../models/stat.js")

//Get all stats
statRouter.get("/", async (req, res, next) => {
    try{
        const stats = await Stat.find()
        return res.status(200).send(stats)
    }
    catch (err) {
        res.status(500)
        return next(err)
    }
})

// Get by Meal
statRouter.get("/:mealId", (req, res, next) => {
    Stat.find({ mealId : req.params.mealId }, (err, Stat) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(Stat)
    })
})

//Post one
statRouter.post("/", (req, res, next) => {
    const newStat = new Stat(req.body)
    newStat.save((err, savedStat) => {
        if(err){
            res.status(500)
            return next(err)
        }
    return res.status(201).send(savedStat)
    })
})

// delete function
statRouter.delete( "/:statId", async (req, res, next) =>{
    Stat.findByIdAndDelete( {_id: req.params.statId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item: ${deletedItem} from the database.`)
    })
})

//update one stat
statRouter.put("/:statId" , (req, res, next) => {
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

module.exports = statRouter