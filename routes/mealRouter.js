const express = require('express')
const mealRouter = express.Router()
const Meal = require('../models/meal.js')
const Stat = require('../models/stat.js')

// Get All Meals
mealRouter.get("/", (req, res, next) => {
    Meal.find((err, meals) => {
    if(err){
    res.status(500)
    return next(err)
    }
    return res.status(200).send(meals)
})
})

// Get Meals by user id
mealRouter.get("/user", (req, res, next) => {
    
    Meal.find({ user: req.auth._id }, (err, meals) => {
        if(err){
        res.status(500)
        return next(err)
        }
        return res.status(200).send(meals)
    })
})

// Add new Meal
mealRouter.post("/", (req, res, next) => {
req.body.user = req.auth._id
const newMeal = new Meal(req.body)
newMeal.save((err, savedMeal) => {
    if(err){
    res.status(500)
    return next(err)
    }
    return res.status(201).send(savedMeal)
})
})

// Delete Meal
mealRouter.delete("/:mealId", (req, res, next) => {
Meal.findOneAndDelete(
    { _id: req.params.mealId, user: req.auth._id },
    (err, deletedMeal) => {
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(`Successfully deleted meal: ${deletedMeal.title}`)
    }
)
})

// Update Meal
mealRouter.put("/:mealId", (req, res, next) => {
Meal.findOneAndUpdate(
    { _id: req.params.mealId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedMeal) => {
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(201).send(updatedMeal)
    }
)
})

module.exports = mealRouter