const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require('dotenv').config();
const fs = require("fs");



// Read the private key
 const privateKeyPath = process.env.PRIVATE_KEY_PATH;
 const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const screatKey = process.env.screatKey;


//validate email and password
const validationRules = [

    check("email", "please provide valid emai")
    .isEmail(),

    check("password", "password must be grater than 5 characters")
    .isLength({
        min: 6
    }),

    check("password", "password must contain at least one uppercase letter")
    .not().isLowercase(),

    check("password", "password must contain at least one lowercase letter")
    .not().isUppercase(),

    check("password", "password must contain at least one non-numaric character")
    .not().isNumeric(),

    check("password", "password must contain at least one non-alphbatic character")
    .not().isAlpha(),

    check("password", "password must contain at least one numaric character")
    .matches(/\d/),


    check("password", "password must contain at least one special character")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)

];

//chek validation results
const signUpValidation = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log({ errors: errors.array() });
        return res.status(420).json({ errors: errors.array() });
       
    }
    next();
}

//hashing paswoord
const hashPassword = async (password) => {
   return bcrypt.hash(password, 10);
  };

const verifyPassword = async (password, hash) => {
    // Validate password by comparing with the hash
    return bcrypt.compare(password, hash);
  };

//create webtokens
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, privateKey,{
        algorithm: 'RS256',
        expiresIn: maxAge
    });

    // return jwt.sign({id}, screatKey,{
    //         expiresIn: maxAge
    //      });
      
  };

  
  

module.exports = {validationRules,signUpValidation,hashPassword,createToken,maxAge,verifyPassword};

