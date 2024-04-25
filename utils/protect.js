const jwt = require('jsonwebtoken')
require('dotenv').config();
const fs = require("fs");


// Read the public key
  const publicKeyPath = process.env.PUBLIC_KEY_PATH;
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const screatKey = process.env.screatKey;

const requireAuth =(req,res,next) =>{
    //const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(' ')[1];
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    jwt.verify(token, publicKey,{algorithm: 'RS256'}, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(200).json(decoded);
        
        
    });
}


module.exports = {requireAuth}