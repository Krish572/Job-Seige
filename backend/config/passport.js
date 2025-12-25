const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../db/models/user.model.js");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
            callbackURL: "http://localhost:3000/api/v1/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try{
                const email = profile.emails[0].value;
                let userFound = await User.findOne({
                    $or : [{"authProviders.googleId" : profile.id}, {email}]
                });
                if(!userFound){
                    userFound = await User.create({
                        email,
                        authProviders : { googleId : profile.id}
                    })
                }else if(!userFound.authProviders?.googleId){
                    userFound.authProviders.googleId = profile.id
                    await userFound.save();
                }
                done(null, userFound);
            }catch(err){
                done(err, null)
            }
        }
    )
)