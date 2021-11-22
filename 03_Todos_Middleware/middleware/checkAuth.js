module.exports = (req, res, next) => {
    const authenticated = req.header('authenticated');
    if(authenticated) {
        next();
    } else {
        return res.status(403).json({message: "Not Authenticated !"})
    }
}