const express = require('express')
const dubRouter = express.Router()
const Dub = require('../models/dub.js')

//Get all dubs
dubRouter.get("/", async (req, res, next) => {
    try{
        const dubs = await Dub.find()
        return res.status(200).send(dubs)
    }
    catch (err) {
        res.status(500)
        return next(err)
    }
})

// dubRouter.get('/user', (req, res, next) => {
//     Dub.find({ user: req.auth._id}, (err, dubs) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//             return res.status(200).send(dubs)
//     })
// })

// Get by dubId
dubRouter.get("/:dubId", (req, res, next) => {
    Dub.find({ dubId : req.params.dubId }, (err, dub) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(dub)
    })
})

dubRouter.get('/user/:userId', (req, res, next) => {
    Dub.find({ user: req.auth._id}, (err, dubs) => {
        if(err){
            res.status(500)
            return next(err)
        }
            return res.status(200).send(dubs)
    })
})

//Post one
dubRouter.post("/", (req, res, next) => {
    console.log('inside dubpost', req.body)
    const newDub = new Dub(req.body)
    newDub.save((err, savedDub) => {
        if(err){
            res.status(500)
            console.log('savedDub', savedDub)
            return next(err)
        }
    return res.status(201).send(savedDub)
    })
})

// delete function
dubRouter.delete( "/:dubId", async (req, res, next) =>{
    Dub.findByIdAndDelete( {_id: req.params.dubId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item: ${deletedItem} from the database.`)
    })
})

//update one dub
dubRouter.put("/:dubId" , (req, res, next) => {
    Dub.findOneAndUpdate(
        {_id : req.params.dubId},
        req.body,
        {new: true},
        (err, updatedDub) => {
            if(err){
                res.status(500)
                return next(err)
            }
            //.send(updatedCard) is causing 500 error due to having numbers in a property
        return res.status(201).send(`Dub has been updated.`, updatedDub)
        }
    )
})

module.exports = dubRouter