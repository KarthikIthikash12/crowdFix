const mongoose = require("mongoose");

module.exports = function validateIssue(req, res, next){
    const {photo, location, description} = req.body; 
    if(!photo || !location || !description){
    return res.status(400).json({
        message: "photo, location and description are required"
    }); 
    } 
    if(!req.body.description || req.body.description.trim().length < 5){
        return res.status(400).json({
            message: "Description must be at least 5 characters"
        });
    }
    next(); 
}

