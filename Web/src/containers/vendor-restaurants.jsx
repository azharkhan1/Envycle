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



// import components
import Logout from '../components/logout';

export default function AddRestaurant() {

    const globalState = useGlobalState();

    const AddRestaurant = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: url + "/add-restaurant",
            data: {
                name: document.getElementById('name').value,
                location: document.getElementById('location').value,
                passcode: document.getElementById('passcode').value,
                discount: document.getElementById('discount').value,
                points: document.getElementById('points').value,
            },
        }).then((response) => {
            console.log("response", response);
            alert('added succesfully');


        }, (error) => {
            alert(error);
            console.log('error is=>',error);

        })
    }

    return (
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
                        <li className="nav-item active">
                            <Link to='/checkorders'><a className="nav-link" >See Orders<span className="sr-only"></span></a></Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/add-restaurant'><a className="nav-link" >Add Product<span className="sr-only"></span></a></Link>
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
                                                    <h3>Add Restaurant</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-8 no-pd">
                                    <div className="main-ws-sec">
                                        <form onSubmit={AddRestaurant}>
                                            <div className="form-row align-items-center">
                                                <div className="col-md-5">
                                                    <input type="text" className="form-control mb-2" id="name" placeholder="Restaurant Name" />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="location" placeholder="Location" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">

                                                    <div className="input-group mb-2">
                                                        <input type="type" className="form-control" id="passcode" placeholder="Voucher passcode" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="discount" placeholder="Discount to be given" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="points" placeholder="Voucher points" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mx-auto ">
                                                    <button type="submit" className="btn btn-primary mb-2">Add Restaurant</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}