const GoogleStrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose')
const User=require('../models/User')

module.exports=function(passport){
    passport.use(new GoogleStrategy({
        clientID:"972049891295-mjutn63ocrjijnb4jl0uge9do3e618jp.apps.googleusercontent.com",
        clientSecret:"-CRqVVzX-1Aqkl3xky2uD8iH",
        callbackURL:'/auth/google/callback'

    },
    async (accessToken,refreshToken,profile,done)=>{
        const newUser={
            googleId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            image:profile.photos[0].value
        }
        try{
            let user=await User.findOne({googleId:profile.id})
            if(user){
                done(null,user)
            }else{
                user=await User.create(newUser)
                done(null,user)    
            }

        }
        catch(err){
            console.log(err)
        }
    }))
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done)=> {
        User.findById(id,(err, user)=> done(err, user))
      });

}