
const express = require("express");
const passport = require('passport');
const router = express.Router();
const facebookAuthController = require('./../../controllers/auth/facebook');

// Using facebook signup Controller
router.get("/signup/facebook", facebookAuthController.facebookAuth);

// authType: reauthenticate will redirect to reauthenticate
router.get("/signup/facebook", passport.authenticate("facebook", { authType: 'reauthenticate', scope : ['email']}));

router.get("/signup/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: '/signup/success',
        failureRedirect: "/signup/fail"
    })
);

router.get("/signup/fail", (req, res) => {
    console.log("failed is running");
    res.status(500).send("Failed attempt");
});

router.get("/signup/success", (req, res) => {
    console.log("Success is running");
    res.json({
        message: 'Success'
    });
});

module.exports = router;