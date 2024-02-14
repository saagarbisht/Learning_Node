const mongoose = require("mongoose");

async function connectingToMongoDB(url){
    return await mongoose.connect(url); 
}

module.exports = {
    connectingToMongoDB
}