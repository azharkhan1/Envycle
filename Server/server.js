// read: 
// Querying/reading data from database: https://mongoosejs.com/docs/models.html#querying
// deleting data from database: https://mongoosejs.com/docs/models.html#deleting
// updating data in database: https://mongoosejs.com/docs/models.html#updating


var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var bcrypt = require("bcrypt-inzi");
var jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken
var cookieParser = require("cookie-parser");
var path = require("path");
var authRoutes = require("./routes/auth");
var http = require("http");
var { SERVER_SECRET, PORT } = require("./core");

var socketIo = require("socket.io");
var { userModel, orderPlaced, restaurantModel, materialModel } = require("./derepo");




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
app.use("/", express.static(path.resolve(path.join(__dirname, "../Web/build"))));


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
                points: decodedData.points,
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
    userModel.findById(req.body.jToken.id, "userName userEmail role points",
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

// User api's

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
                remarks: req.body.remarks,
                status: 'Pending',
                userEmail: req.body.jToken.userEmail,
                userName: req.body.jToken.userName
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

app.delete('/delete-order', (req, res) => {
    if (!req.body.id) {
        res.send({
            message: `
            Please send order id in the json body 
            e.g:
            "id" : '12309230fvkid'
            `
        });
    }

    orderPlaced.findById(req.body.id, {}, (err, data) => {
        if (!err) {
            data.remove()
            res.status(200).send({
                message: 'Request canceled succesfully'
            })
        }
        else {
            res.status(500).send({
                message: 'server error'
            })
        }
    })
})

app.get("/getOrders", (req, res, next) => {
    orderPlaced.find({}, (err, data) => {
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

app.get("/get-materials", (req, res, next) => {
    materialModel.find({}, (err, data) => {
        if (!err) {
            res.status(200).send({
                materials: data,
            });
        }
        else {
            console.log("error : ", err);
            res.status(500).send("error");
        }
    })
});

app.post('/redeem-voucher', (req, res, next) => {
    if (!req.body.id || !req.body.passcode) {
        res.status(404).send({
            message: `
            Please send following in json body to avail the voucher
            e.g
            {
                id : restaurant_id,
                passcode : restaurant_passcode xxx
            }
            `
        })
        return;
    }


    userModel.findOne({ userEmail: req.body.jToken.userEmail }, {}, (err, user) => {
        if (!err) {
            restaurantModel.findById(req.body.id, {}, (err, voucher) => {
                if (!err) {
                    if (voucher.passcode === req.body.passcode) {
                        if (voucher.points >= user.points) {
                            user.updateOne({ points: user.points - voucher.points }, (err, redeemed) => {
                                if (!err) {
                                    res.status(200).send({
                                        message: 'Voucher redeemed succesfully',
                                        user: user,
                                    })
                                }
                                else {
                                    res.status(403).send({
                                        message: 'server error'
                                    })
                                }
                            })
                        }
                        else {
                            res.status(407).send({
                                message: 'not enough points'
                            })
                        }
                    }
                    else {
                        res.status(403).send({
                            message: 'restaurant passcode did not match'
                        })
                    }
                }
                else {
                    res.status(404).send({
                        message: 'server error'
                    })
                }
            })
        }
        else {
            res.status(500).send({
                message: 'server error please try again later'
            })
        }
    })
})
app.post('/update-password', (req, res, next) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
        res.send({
            message:
                `
        please send following in json body
        e.g
        "oldPassword" : "xxx",
        newPassword : "xxxx"
        `
        })
        return
    }
    userModel.findOne({ userEmail: req.body.jToken.userEmail }, (err, user) => {
        if (!err) {
            bcrypt.varifyHash(req.body.oldPassword, user.userPassword).then(isMatched => {
                if (isMatched) {
                    bcrypt.stringToHash(req.body.newPassword).then(hashPassword => {
                        user.updateOne({ userPassword: hashPassword }, (err, updated) => {
                            if (!err) {
                                res.status(200).send({
                                    message: 'password updated successfully'
                                })
                            }
                            else {
                                res.status(500).send({
                                    message: 'server error'
                                })
                            }
                        })
                    })
                }
                else {
                    res.status(403).send({
                        message: `Old password didn't match`
                    })
                }
            })
        }
        else {
            res.status(501).send({
                message: 'server error'
            });
        }
    })

})


// Admin api's

app.patch('/confirmOrder', (req, res, next) => {
    var { id } = req.body;
    console.log(' the request is = > ', req.body);
    userModel.findOne({ userEmail: req.body.userEmail }, (err, user) => {
        if (!err) {
            orderPlaced.findById({ _id: id }, (err, data) => {
                if (data) {
                    data.updateOne({ status: 'Confirmed' }, {}, (err, updated) => {
                        if (updated) {
                            console.log('updated user is=>', updated);
                            user.updateOne({ points: user.points + data.quantity }, {}, (err, pointsUpdate) => {
                                if (!err) {
                                    res.send({
                                        message: 'points updated succesfully',

                                    })
                                }
                                else {
                                    res.status(501).send({
                                        message: 'server error'
                                    })
                                }
                            })
                        }
                        else {
                            res.status(501).send({
                                message: "server error",
                            })
                        }
                    })
                }
                else {
                    res.status(403).send({
                        message: "Could not find the order"
                    })
                }
            })
        }
        else {
            res.status(501).send({
                message: "user could not be found",
            })
        }
    })
})

app.patch('/declineOrder', (req, res, next) => {
    var { id } = req.body;
    userModel.findOne({ userEmail: req.body.jToken.userEmail }, (err, user) => {
        if (!err) {
            orderPlaced.findById({ _id: id }, (err, data) => {
                if (data) {
                    data.updateOne({ status: 'Declined' }, {}, (err, updated) => {
                        if (updated) {
                            res.send({
                                message: 'order has been declined',
                            })
                        }
                        else {
                            res.status(501).send({
                                message: "server error",
                            })
                        }
                    })
                }
                else {
                    res.status(403).send({
                        message: "Could not find the order"
                    })
                }
            })
        }
        else {
            res.status(501).send({
                message: "user could not be found",
            })
        }
    })
})

app.post('/add-restaurant', (req, res, next) => {

    console.log('req body is ', req.body);
    if (!req.body.name || !req.body.points || !req.body.location || !req.body.passcode || !req.body.discount) {
        res.status(403).send({
            message: `
            Please send following in json body,
            e.g:
            {
            "name" : "restaurant name",
            "location" : "xyz location",
            "passcode" : "xxxxx",
            "discount" : 10,
            "points" : 40
            }
            `
        });
    };

    if (req.body.jToken.role === 'admin') {
        restaurantModel.create({
            name: req.body.name,
            location: req.body.location,
            passcode: req.body.passcode,
            discount: req.body.discount,
            points: req.body.points,
        }).then((added) => {
            res.status(200).send({
                message: 'succesfully added'
            })
        }).catch((err) => {
            res.send({
                message: 'an error occured',
            })
        })
    }
    else {
        res.status(403).send({
            message: 'Only admin can add the restaurants',
        })
    }
});

app.post('/add-materials', (req, res, next) => {
    console.log('materials console', req.body);
    console.log('req body is ', req.body);
    if (!req.body.name || !req.body.url) {
        res.status(403).send({
            message: `
            Please send following in json body,
            e.g:
            {
            "name" : "material name",
            "url" : "image url"
            }
            `
        });
    };

    if (req.body.jToken.role === 'admin') {
        materialModel.create({
            name: req.body.name,
            url: req.body.url,
        }).then((added) => {
            res.status(200).send({
                message: 'succesfully added'
            })
        }).catch((err) => {
            res.send({
                message: 'an error occured',
            })
        })
    }
    else {
        res.status(403).send({
            message: 'Only admin can add the restaurants',
        })
    }
});


app.get('/get-restaurants', (req, res, next) => {
    restaurantModel.find({}, (err, data) => {
        if (!err) {
            res.status(200).send({
                restaurants: data,
            })
        }
        else {
            res.status(501).send({
                message: 'server error',
            });
        }
    })
})

app.post("/logout", (req, res, next) => {
    res.cookie('jToken', '', {
        maxAge: 86_400_000,
        httpOnly: true,
    });
    res.clearCookie();
    res.send({
        message: 'logout succesfully'
    })
});



server.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})

