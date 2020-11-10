const jwt = require('jsonwebtoken');

const blacklist = require('../domain/models/blacklist');

const verifyToken =  (req, res, next) => {
    const token = req.headers["user-token"];
    
    if (!token) {
      return res.status(403).json({
        code: res.statusCode,
        error: "Access Denied",
      });  
    }

    // check token is blacklist
    blacklist.exists({token: token}, (err, result) => {
        if (!result) {
            
            try {
                const user = jwt.verify(token, process.env.JWT_KEY);
                req.user = user;
                 next();
                } catch (err) { 
                res.status(400).json({
                    status: res.statusCode,
                    message: "Invalid / Expired token",
                });
            }
        }else{
            return res.status(401).json({code: res.statusCode, error:"Unauthorized"});
        }
    });

}

module.exports = verifyToken;