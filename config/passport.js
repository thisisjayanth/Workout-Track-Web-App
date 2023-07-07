const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// client-id: 946114168842-pf65h0fac1ojsbe6r1p6fe2v36jr8j74.apps.googleusercontent.com
// client-secret: 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
const mongoose = require('mongoose');
const User = mongoose.model('User');
passport.use(new GoogleStrategy({
    clientID: "946114168842-pf65h0fac1ojsbe6r1p6fe2v36jr8j74.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
},async(accessToken, refreshToken, profile, done)=>{
    // console.log("Profile",profile);
    const newUser = {
        name: profile.displayName,
        gender: profile.gender,
        email: profile.emails[0].value,
        google_id: profile.id,

    }
    try{
        let user = await User.findOne({google_id: profile.id});
        if(user){
            console.log(user,"already signed in");
            done(null,user);
        }
        else{
            user = await User.create(newUser);
            console.log(user,"created new user");
            done(null,user);
        }
    }
    catch(err){
            console.log(err);
            done(err);
        }
    
})
);

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try{
        const user = await User.findById(id)
        done(null,user);
    }
    catch(err){
        done(err);
    }
})