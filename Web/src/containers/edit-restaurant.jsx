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

export default function EditRestaurant() {


    const globalState = useGlobalState();
    const [restaurants, setRestaurants] = useState([]);
    const [change , setChange ] = useState(true);

    useEffect(() => {


        axios({
            method: 'get',
            url: `${url}/get-restaurants`,
        }).then((response) => {
            console.log('restaurants are', response.data);
            response.data.restaurants.map((value) => value.edit = false);
            setRestaurants(response.data.restaurants);
        }, (error) => {
            console.log("an error occured");
        })

    }, [change])


    const edit = (index) => {
        var prevRestaurants = [...restaurants];
        prevRestaurants[index].edit = true;
        setRestaurants(prevRestaurants);
    }

    const updateRestaurant = (id , index) => {
        
       console.log('id is => ',id);

        axios({
            method: 'post',
            url: `${url}/update-restaurant`,
            data: {
                name: document.getElementById('name').value,
                location: document.getElementById('location').value,
                passcode: document.getElementById('passcode').value,
                discount: document.getElementById('discount').value,
                points: document.getElementById('points').value,
                id : id,
            }
        }).then((response) => {
            alert('updated succesfully');
            var prevRestaurants = [...restaurants];
            prevRestaurants[index].edit = false;
            setRestaurants(prevRestaurants);
            setChange(!change);
        }).catch((err) => {
            alert('server error try again please');
        })
    }
    const deleteRestaurant = (id)=>{
        axios({
            method: 'delete',
            url : `${url}/delete-restaurant`,
            data : {
                id : id
            }
        }).then((res)=>{
            alert('succesfully deleted');
            setChange(!change);
        }).catch((err)=>{
            alert('an error occoured');
        })
    }


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
                            <Logout />                        </div>
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
                                            {/* <div className="post-topbar">
                                                <h4>
                                                    Edit Restaurant
                                                </h4>
                                            </div> */}
                                            <div>

                                                <row>


                                                    {restaurants.map((value, index) => {
                                                        return <div class='col-md-12'>
                                                            <div key={index} className="card" style={{ width: 'rem', margin: '0 auto' }}>
                                                                <div className="card-body">
                                                                    <div>
                                                                        {value.edit ? <> <label>Name</label><input id='name' class='w-100' defaultValue={value.name} /> </> : <span>Restaurant Name: {value.name}</span>}
                                                                    </div>
                                                                    <hr />
                                                                    <div class='mt-3'>
                                                                        {value.edit ? <> <label>Location</label><input id='location' class='w-100' defaultValue={value.location} /> </> : <span>Location {value.location}</span>}
                                                                    </div>
                                                                    <hr />
                                                                    <div class='mt-3'>
                                                                        {value.edit ? <><label>Passcode</label><input id='passcode' class='w-100' defaultValue={value.passcode} /></> : <span>Restaurant passcode: {value.passcode}</span>}
                                                                    </div>
                                                                    <hr />
                                                                    <div class='mt-3'>
                                                                        {value.edit ? <> <label>Discount</label><input id="discount" class='w-100' defaultValue={value.discount} /> </> : <span>Restaurant discount: {value.discount}</span>}
                                                                    </div>
                                                                    <hr />
                                                                    <div class='mt-3'>
                                                                        {value.edit ? <><label>Points</label><input id="points" class='w-100' defaultValue={value.points} /></> : <span>Restaurant points: {value.points}</span>}
                                                                    </div>
                                                                    <hr />
                                                                    <div >

                                                                    <div class='float-left'>   {!value.edit ? <button class='btn btn-success btn-sm' onClick={() => edit(index)}>Edit</button> : <button class='btn btn-success btn-sm' onClick={() => updateRestaurant(value._id , index)}>Update</button>}</div>
                                                                  <div class='float-right'>

                                                                    <button class='btn btn-outline-danger btn-sm' onClick={()=>deleteRestaurant(value._id)}> Delete</button>
                                                                  </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    })}

                                                </row>

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