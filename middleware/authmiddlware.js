
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/usermodel");

const auth = async (req, res, next, authenticationRequired = true) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (authenticationRequired && !token) {
        return res.status(401).send({ "msg": "Please login" });
    }
    
    if (token) {
        try {
            const decoded = jwt.verify(token, "masai");
            const { userID } = decoded;
            const user = await UserModel.findById(userID);
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).send({ "msg": "Invalid user" });
            }
        } catch (err) {
            res.status(401).send({ "msg": "Invalid token" });
        }
    } else {
        next();
    }
};

module.exports = { auth };






