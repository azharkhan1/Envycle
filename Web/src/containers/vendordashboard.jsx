import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

// Importing styles
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'


// importing context
import { useGlobalState, useGlobalStateUpdate } from "../context/index";

// importing url 
import url from "../core";

// import socket
import socket from "../config/socket";

// import components
import Logout from '../components/logout';

export default function VendorDashboard() {


    const globalState = useGlobalState();
    const [orders, setOrders] = useState([]);
    const [realTime, setRealTime] = useState(false);
    useEffect(() => {
        let arr = [];
        axios({
            method: 'get',
            url: `${url}/getOrders`,
        }).then((response) => {

            response.data.placedRequests.map((value) => {
                if (value.status === 'Pending') {
                    arr.push(value);
                }
            })
            setOrders(arr);
        }, (error) => {
            console.log("an error occured");
        })

        socket.on('requests', (data) => {
            setRealTime(!realTime);
        })
    }, [realTime])

    const confirmOrder = (index) => {
        console.log(orders[index]._id)
        axios({
            method: 'patch',
            url: `${url}/confirmOrder`,
            data: {
                id: orders[index]._id,
                userEmail: orders[index].userEmail
            },

        }).then((res) => {
            alert('Order confirmed');
            setRealTime(!realTime);
        }).catch((err) => {
            console.log("error is=>", err);
        })
    }

    const declineOrder = (index) => {
        console.log(orders[index]._id)
        axios({
            method: 'patch',
            url: `${url}/declineOrder`,
            data: {
                id: orders[index]._id,
            },
        }).then((res) => {
            alert('order Declined');
            setRealTime(!realTime);
        }).catch((err) => {
            console.log("error is=>", err);
        })
    }

    return (
        <div>
            <div className="wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">{globalState.user.userName}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/'><a className="nav-link" >Home <span className="sr-only">(current)</span></a></Link>
                            </li>
                            <li className="nav-item ">
                                <Link to='/checkorders'><a className="nav-link" >See Orders<span className="sr-only"></span></a></Link>
                            </li>

                            <li className="nav-item active">
                                <Link to='/add-restaurant'><a className="nav-link" >Add Restaurant<span className="sr-only"></span></a></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/add-product'><a className="nav-link" >Add Product<span className="sr-only"></span></a></Link>
                            </li>
                        </ul>
                        <Logout />
                    </div>
                </nav>
                <main>
                    <div className="main-section">
                        <div className="container">
                            <div className="main-section-data">
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                                        <div className="main-left-sidebar no-margin">
                                            <div className="user-data full-width">
                                                <div className="user-profile">
                                                    <div className="username-dt">
                                                        <div className="usr-pic">
                                                        </div>
                                                    </div>
                                                    <div className="user-specs">
                                                        <h3>{globalState.user.userName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-8 no-pd">
                                        <div className="main-ws-sec">
                                            <div className="post-topbar">

                                            </div>
                                            <div>
                                                {
                                                    orders.reverse().map(({ cart, userEmail, total, phoneNo, address, remarks }, index) => {
                                                        return (
                                                            <div key={index} className="card text-center" style={{ width: '18rem' }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{userEmail}</h5>
                                                                    <h6 className="card-title">{phoneNo}</h6>
                                                                    <h6>{address}</h6>

                                                                    {remarks ? <small>Remarks: {remarks}</small> : ''}
                                                                    {
                                                                        cart.map((cartVal, i) => {
                                                                            return <ul key={i}>
                                                                                <li>
                                                                                    <p>{cartVal.product} Price <b>{cartVal.productPrice} x {cartVal.quantity}</b></p>
                                                                                </li>
                                                                            </ul>
                                                                        })
                                                                    }
                                                                    <button onClick={() => confirmOrder(index)} className="btn btn-primary ml-3">Accept Order</button>
                                                                    <button onClick={() => declineOrder(index)} className="btn btn-danger ">Decline Order</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}