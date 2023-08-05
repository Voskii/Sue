const express = require('express')
const favRouter = express.Router()
const Fav = require('../models/dub.js')

//Get all dubs
// favRouter.get("/", async (req, res, next) => {
//     try{
//         const dubs = await Dub.find()
//         return res.status(200).send(dubs)
//     }
//     catch (err) {
//         res.status(500)
//         return next(err)
//     }
// })

favRouter.get('/user/:userId', (req, res, next) => {
    Fav.find({ user: req.auth._id}, (err, favs) => {
        if(err){
            res.status(500)
            return next(err)
        }
            return res.status(200).send(favs)
    })
})

//Post one
favRouter.post("/", (req, res, next) => {
    console.log('inside favpost', req.body)
    const newFav = new Fav(req.body)
    newFav.save((err, savedFav) => {
        if(err){
            res.status(500)
            return next(err)
        }
    return res.status(201).send(savedFav)
    })
})

// delete function
favRouter.delete( "/:dubId", async (req, res, next) =>{
    Dub.findByIdAndDelete( {_id: req.params.dubId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item: ${deletedItem} from the database.`)
    })
})

//update one dub
favRouter.put("/:favId" , (req, res, next) => {
    Fav.findOneAndUpdate(
        {_id : req.params.favId},
        req.body,
        {new: true},
        (err, updatedFav) => {
            if(err){
                res.status(500)
                return next(err)
            }
            //.send(updatedCard) is causing 500 error due to having numbers in a property
        return res.status(201).send(`Fav has been updated.`, updatedFav)
        }
    )
})

module.exports = favRouter