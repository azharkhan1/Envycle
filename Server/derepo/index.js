
var {DBURI} = require("../core");

console.log('db uri is=>',DBURI);

var mongoose = require("mongoose");





mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true });

////////////////mongodb connected disconnected events///////////////////////////////////////////////

mongoose.connection.on("connected", () => { // MONGODB Connected
    console.log("Mongoose connected");
})


mongoose.connection.on("disconnected", () => {
    console.log("MONGODB disconnected");
    process.exit(1);
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB disconnected due to : " + err);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("MONGODB disconnected");
        process.exit(0);
    })

})

var userSchema = new mongoose.Schema({
    userEmail: String,
    userName: String,
    userPassword: String,
    role : String,
    points : String,
    gender : String,
    points : Number,
});

var userModel = mongoose.model("users", userSchema);




var otpSchema = new mongoose.Schema({
    "userEmail": String,
    "otp": String,
    "createdOn" : { "type": Date, "default": Date.now },
});


var otpModel = mongoose.model("otp", otpSchema);

var collection = mongoose.Schema({
    cart : Array,
    address : String,
    userEmail : String,
    remarks : String,
    quantity : Number,
    status : String,
    phoneNo : String,
    userEmail : String,
    userName : String,
    "createdOn" : { "type": Date, "default": Date.now },
})

var orderPlaced = mongoose.model("requests",collection);

var restaurant = mongoose.Schema({
    name : String,
    location : String,
    passcode : String,
    discount : Number,
    points : Number,
})

var restaurantModel = mongoose.model("Restaurants",restaurant);

var material = mongoose.Schema({
    name : String,
    url : String,
})

var materialModel = mongoose.model('Materials' , material);

module.exports = {
    userModel: userModel,
    otpModel: otpModel,
    orderPlaced : orderPlaced,
    restaurantModel : restaurantModel,
    materialModel : materialModel,
}