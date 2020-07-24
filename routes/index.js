const express=require('express')
const passport = require('passport')
const router=express.Router()
const User=require('../models/User')
const Score=require('../models/Score')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})

router.get('/snakeIt',ensureAuth,(req,res)=>{
    res.render('gamepage')
})

router.post('/submitIt',ensureAuth,async(req,res)=>{
    console.log(req.body)
    const newScore={
        score:req.body.hiddenScore,
        player:req.user._id,
    }
    try{
    let final=await Score.create(newScore)
    res.redirect('/snakeIt')
            
    }
    catch(err){
        console.log(err)
    }
})

router.get('/scores',ensureAuth,async(req,res)=>{
    try{
        const scores= await Score.find().populate('player').sort({score:'desc'}).lean()
        res.render('scores',{
        scores,
        }) 
    }
    catch(err){
        console.log(err)
    }
})
module.exports=router
