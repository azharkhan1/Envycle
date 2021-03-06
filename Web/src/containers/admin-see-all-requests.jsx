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
import { useGlobalState } from "../context/index";

// importing url 
import url from "../core";

// import socket
import socket from "../config/socket";

// import components
import Logout from '../components/logout';

export default function AllRequests() {


    const globalState = useGlobalState();
    const [orders, setOrders] = useState([]);
    const [realTime, setRealTime] = useState(false);
    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/getOrders`,
        }).then((response) => {
            console.log(response.data.placedRequests)
            setOrders(response.data.placedRequests);
        }, (error) => {
            console.log("an error occured");
        })
        socket.on('requests', (data) => {
            console.log('data is', data);
            setRealTime(!realTime);
        })
    }, [realTime])




    return (
        <div>
            <div className="wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div class='container'>
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
                                    <Link to='/all-requests'><a className="nav-link" >See All Requests<span className="sr-only"></span></a></Link>
                                </li>

                                <li className="nav-item active">
                                    <Link to='/add-restaurant'><a className="nav-link" >Add Restaurant<span className="sr-only"></span></a></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/add-product'><a className="nav-link" >Add Material<span className="sr-only"></span></a></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/edit-restaurant'><a className="nav-link" >Edit Restaurant<span className="sr-only"></span></a></Link>
                                </li>
                            </ul>
                            <Logout />
                        </div>
                    </div>
                </nav>

                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data" style={{ marginTop: '20px' }}>
                            <div className="row">
                                <div className="col-lg-12 col-md-8 no-pd">
                                    <div className="main-ws-sec">
                                        {/* <div className="post-topbar">

                                            </div> */}
                                        <div className='row'>
                                            {
                                                orders.reverse().map(({ cart, userEmail, total, phoneNo, address, remarks, status }, index) => {
                                                    return (
                                                        <div className='col-md-6'>
                                                            <div key={index} className="card" style={{ margin: '20px auto' }}>
                                                                <div className="card-body">
                                                                    <div class='text-center mb-5'>
                                                                        <h3 >Status:  <span style={status === 'Confirmed' ? { color: '#3bb33b' } : { color: 'red' }}>{status}</span>  </h3>
                                                                    </div>
                                                                    <div>
                                                                        <span>Email : </span>
                                                                        <span className='float-right'>{userEmail}</span>
                                                                    </div>
                                                                    <hr />
                                                                    <div className='mt-3 mb-1'>
                                                                        <span >Phone : </span>
                                                                        <span className='float-right'>{phoneNo}</span>
                                                                    </div>
                                                                    <hr />
                                                                    <div className='mt-3'>
                                                                        <span>Address : </span>
                                                                        <span className='float-right'>{address}</span>
                                                                    </div>
                                                                    <hr />


                                                                    {
                                                                        cart.map((cartVal, i) => {
                                                                            return <ul key={i}>
                                                                                <li>
                                                                                    <div className='mt-2'>
                                                                                        <span className="card-title">Product : </span>
                                                                                        <span className='float-right'>{cartVal.product}  {cartVal.quantity} kg</span>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        })

                                                                    }
                                                                    {remarks ? <div className='text-center'><small>Remarks: {remarks}</small></div> : ''}


                                                                </div>
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

            </div>
        </div>
    )
}