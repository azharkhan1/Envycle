import React, { useRef, useState } from 'react';
import hamaraImage from "./images/cm-main-img.png";
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import { Link } from "react-router-dom";
import url from "../core/index";
import axios from "axios";
import aboutus from './images/aboutus-img.png'



// Improrting Global States
import { useGlobalState, useGlobalStateUpdate } from "../context";

// Allowing axios to bring credentials e.g cookies
axios.defaults.withCredentials = true;





function Signin() {


    const setGlobalState = useGlobalStateUpdate();
    const [message ,setMessage] = useState();

    var email = useRef();
    var password = useRef();

    function login(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: url + "/auth/login",
            data: {
                userEmail: email.current.value,
                userPassword: password.current.value,
            },
        }).then((response) => {
            setGlobalState(prev => ({
                ...prev, loginStatus: true, user: {
                    userEmail: response.data.user.userEmail,
                    userName: response.data.user.userName,
                    points : response.data.user.points,
                }, role: response.data.user.role,
            }));
        }, (error) => {
            // alert(error.response.data.message);
            setMessage(error.response.data.message);
        })
    }

    return (
        <div className="wrapper">
            <div className="wrapper">
                <div className="sign-in-page">
                    <div className="signin-popup">
                        <div className="signin-pop">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="cmp-info">
                                        <div className="cm-logo">
                                            <img src="" alt="" />
                                            <p> <b>Recycle your materials through our application</b>
                                                   </p>
                                        </div>
                                        <img src={aboutus} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="login-sec">
                                        <ul className="sign-control">
                                            <li data-tab="tab-1" className="current"><Link to="/signin">Sign in </Link></li>
                                            <li> <Link to="/signup">Signup </Link> </li>
                                        </ul>

                                        <div className="sign_in_sec current" id="tab-1">

                                        {message === '' || ' ' ? '' :
                                        <div className="signup-tab">
                                           <ul style={{color:'red'}}>
                                              {/* <li data-tab="tab-3" className="current"><Link to="/"> User </Link></li> */}
                                              {/* <li data-tab="tab-4"><a href="#" title="">Company</a></li> */}
                                              {/* <li >   <Link to="/vendorsignin"> Company </Link> </li> */}
                                       
                                          </ul>
                                      </div>
                                        }  
                                       
                                          

                                            <form onSubmit={(e) => login(e)}>
                                                <div className="row">
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input autoComplete="on" ref={email} type="email" name="email" placeholder="Enter Email" />
                                                            <i className="la la-envelope"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input ref={password} type="password" name="password" placeholder="Enter Password" />
                                                            <i className="la la-lock"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="checky-sec">
                                                            <div className="fgt-sec">

                                                                <Link to='/forget-password'><small>Forgot password?</small></Link>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <button type="submit" value="submit">Sign in</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footy-sec">
                    <div className="container">
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Signin;



