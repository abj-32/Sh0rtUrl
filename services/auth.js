const jwt = require('jsonwebtoken');
const secret = "abj@72";

function setUser(user) {
    // Define the payload object, which will include `user` data
    const payload = { 
        _id:user._id,
        email:user.email,
    };
    return jwt.sign(payload, secret);
}

function getUser(token) {
    if (!token) return null;
    
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null; // Return null if the token is invalid or malformed
    }
}

module.exports = {
    setUser,
    getUser
};
