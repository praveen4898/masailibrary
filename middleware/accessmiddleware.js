
const access = (isAdminRequired) => {
    return (req, res, next) => {
        if (isAdminRequired && req.user.isAdmin) {
            next(); 
        } else if (!isAdminRequired) {
            next(); 
        } else {
            res.status(403).send({ "msg": "You are not authorized to access this page" });
        }
    };
};

module.exports = { access };



