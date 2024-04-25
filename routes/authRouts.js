const router = require("express").Router();
const {signUp,signIn}= require ('../controllers/authController');
const {signUpValidation,validationRules}= require ('../utils/authUtils');
const{requireAuth} = require('../utils/protect')


// Route for user sign-up

router.post('/signup',validationRules,signUpValidation,signUp);

// Route for user sign-up
router.post('/signin',signIn);

router.post('/validate',requireAuth);





module.exports = router;