const passport = require('passport');
const strategy = require('passport-facebook');
const FacebookStrategy = strategy.Strategy;

exports.facebookAuth = (req, res, next) => {
    

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new FacebookStrategy({
        clientID: process.env.YOUR_FACEBOOK_APP_ID,
        clientSecret: process.env.YOUR_FACEBOOK_APP_SECRET,
        callbackURL: "/signup/facebook/callback",
        profileFields: ['id', 'emails', 'name']
    }, (accessToken, refreshToken, profile, done) => {
        const facebookUser = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile: profile
        };
        console.log("The facebook Auth is running");
        console.log(facebookUser);

        
        // Save facebookUser in your database here if you want

        done(null, facebookUser);
    }));
    next();
};
