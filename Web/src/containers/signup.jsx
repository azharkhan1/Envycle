import React, { useRef } from 'react';
import hamaraImage from "./images/cm-main-img.png";
import "./css/app.css";
import './css/line-awesome.css'
import './css/responsive.css'
import './css/style.css'
import { Link } from "react-router-dom";
import url from "../core/index";
import axios from 'axios';
import aboutus from './images/aboutus-img.png'

export default function Signup() {

    const [message, setMessage] = React.useState();


    var email = useRef();
    var password = useRef();


    function signUp(e) {
        e.preventDefault();
        var firstName = document.getElementById('firstName').value
        var lastName = document.getElementById('lastName').value
        firstName = firstName.charAt(0) + firstName.slice(1)
        lastName = lastName.charAt(0) + lastName.slice(1)
        var fullName = firstName + ' ' + lastName
        var gender;
        if (document.getElementById('male').checked) {
            gender = 'male'
        }
        else {
            gender = 'female'
        }

        axios({
            method: 'post',
            url: url + "/auth/signup",
            data: {
                userName: fullName,
                userEmail: email.current.value.toLowerCase(),
                userPassword: password.current.value,
                gender: gender,
            },
        }).then((response) => {
            console.log("response", response);
            alert('Signed up successfully');

            //

        }, (error) => {
            // alert(error.response.data.message);
            alert(error.response.data.message)
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
                                            {/* <li data-tab="tab-1" ><a href="#" title="">Sign in</a></li> */}
                                            <li> <Link to="/signin">Sigin </Link></li>
                                            <li data-tab="tab-2" className="current"><Link to="/signup">Signup </Link></li>
                                        </ul>

                                        <div className="sign_in_sec current" id="tab-2">


                                        {message === '' || ' ' ? '' : 
                                         <div className="signup-tab">
                                         <i className="fa fa-long-arrow-left"></i>

                                         <ul>
                                             {/* <li data-tab="tab-3" className="current"><Link to="/signup"> User </Link></li> */}
                                             {/* <li data-tab="tab-4"><a href="#" title="">Company</a></li> */}
                                             {/* <li >   <Link to="/vendor"> Company </Link> </li> */}
                                             {message}
                                         </ul>
                                     </div>
                                        }
                                           
                                            <div className="dff-tab current" id="tab-3">
                                                <form onSubmit={(e) => signUp(e)}>
                                                    <div className="row">
                                                        <div className="col-lg-12 no-pdd">
                                                            <div className="sn-field">
                                                                <input required id="firstName" autoComplete="on" type="text" name="name" placeholder="First Name" />
                                                                <i className="la la-user"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 no-pdd">
                                                            <div className="sn-field">
                                                                <input required id="lastName" autoComplete="on" type="text" name="name" placeholder="Last Name" />
                                                                <i className="la la-user"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 no-pdd">
                                                            <div className="sn-field">
                                                                <input required autoComplete="on" ref={email} type="email" placeholder="Enter email" />
                                                                <i className="la la-envelope"></i>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12 no-pdd">
                                                            <div className="sn-field">
                                                                <input required ref={password} autoComplete="on" type="password" name="password" placeholder="Password" minLength={6} maxLength={200}/>
                                                                <i className="la la-lock"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <label
                                                                style={{ marginLeft: 10 }}
                                                            > Male: </label>
                                                            <input
                                                                type='radio'
                                                                name='gender'
                                                                value='Male'
                                                                className='radioBtn'
                                                                style={{ marginLeft: 5 }}
                                                                id='male'
                                                                required
                                                            />
                                                            <label
                                                                style={{ marginLeft: 10 }}
                                                            >Female: </label>
                                                            <input
                                                                type='radio'
                                                                name='gender'
                                                                value='Female'
                                                                className='radioBtn'
                                                                style={{ marginLeft: 5 }}
                                                                required
                                                            />
                                                        </div>


                                                        <div className="col-lg-12 no-pdd">
                                                            <button type="submit" value="submit">Get Started</button>
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
                </div>
                <div className="footy-sec">
                    <div className="container">


                    </div>
                </div>

            </div>
        </div>
    )
}