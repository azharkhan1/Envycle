// read: 
// Querying/reading data from database: https://mongoosejs.com/docs/models.html#querying
// deleting data from database: https://mongoosejs.com/docs/models.html#deleting
// updating data in database: https://mongoosejs.com/docs/models.html#updating


var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
var cookieParser = require("cookie-parser");
var path = require("path");
var authRoutes = require("./routes/auth");
var http = require("http");
var { SERVER_SECRET, PORT } = require("./core");

var socketIo = require("socket.io");
var { userModel, orderPlaced } = require("./derepo");




var app = express();
var server = http.createServer(app);
var io = socketIo(server, {
    cors: ["http://localhost:3000", 'https://envycle.herokuapp.com']
});
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000", 'https://envycle.herokuapp.com'],
    credentials: true,
}));


app.use(cookieParser());
app.use('/auth', authRoutes);
app.use("/", express.static(path.resolve(path.join(__dirname, "../../web/build"))));


app.use(function (req, res, next) {
    console.log("req.cookies: ", req.cookies);
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {
            const issueDate = decodedData.iat * 1000; // 1000 miliseconds because in js ms is in 16 digits
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate; // 86400,000

            if (diff > 3000000) { // expire after 5 min (in milis)
                res.status(401).send("token expired")
            }
            var token = jwt.sign({
                id: decodedData.id,
                userName: decodedData.userName,
                userEmail: decodedData.userEmail,
                role: decodedData.role,
            }, SERVER_SECRET)
            res.cookie('jToken', token, {
                maxAge: 86_400_000,
                httpOnly: true
            });
            req.body.jToken = decodedData;
            req.headers.jToken = decodedData;
            next();

        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {
    userModel.findById(req.body.jToken.id, "userName userEmail role ",
        function (err, doc) {
            if (!err) {
                res.send({
                    profile: doc
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
});


app.post("/place-order", (req, res, next) => {
  
    if (!req.body.cart || !req.body.address || !req.body.phoneNo) {
        res.send({
            message: `
            Please send following in json body
            e.g
            "order" : ['materialone','materialtwo',.....,],
            "address" : 'xyz street',
            "phoneNo" : 'xxxx444888',
            "quantity" : 46
            `
        })
        return;
    }

    userModel.findOne({ userEmail: req.body.jToken.userEmail }, (err, userFound) => {
        if (!err) {
            orderPlaced.create({
                cart: req.body.cart,
                address: req.body.address,
                phoneNo: req.body.phoneNo,
                quantity: req.body.quantity,
                remarks : req.body.remarks,
                status: 'pending',
                userEmail : req.body.jToken.userEmail,
                userName : req.body.jToken.userName
            }).then((orderPlaced) => {
                res.status(200).send({
                    message: "Your request has been sent succesfully",
                    orderPlaced: orderPlaced,
                });
                io.emit("requests", orderPlaced);
            })
                .catch((err) => {
                    res.status(500).send({
                        message: "an error occured"
                    })
                })
        }
    })



});

app.get("/myorders", (req, res, next) => {
    orderPlaced.find({ userEmail: req.body.jToken.userEmail }, (err, data) => {
        if (!err) {
            console.log('getting orders=>', data)
            res.status(200).send({
                placedRequests: data,
            });
        }
        else {
            console.log("error : ", err);
            console.log('error', err)

            res.status(500).send({
                message: 'error occored'
            });
        }
    })
});

app.get("/getOrders", (req, res, next) => {
    order.find({}, (err, data) => {
        if (!err) {
            res.status(200).send({
                placedRequests: data,
            });
        }
        else {
            console.log("error : ", err);
            res.status(500).send("error");
        }
    })
});


app.post("/logout", (req, res, next) => {
    res.cookie('jToken', '' ,{
        maxAge : 86_400_000,
        httpOnly : true,
    });
    res.clearCookie();
    res.send({
        message : 'logout succesfully'
    })
})

server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})

