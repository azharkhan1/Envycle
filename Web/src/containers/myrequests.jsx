import React, { useEffect } from "react";
import {useGlobalState} from  '../context'
import axios from 'axios'
import url from '../core/index';


import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'


import {
    Link
} from 'react-router-dom';

import Logout from '../components/logout';

export default function MyRequests() {  
    const globalState = useGlobalState();
    const [orders, setOrders] = React.useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/myorders`,
        }).then((response) => {
            console.log('my orders , ', response)
            setOrders(response.data.placedRequests);
        }, (error) => {
            console.log("an error occured");
        })
    }, [])


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
                            <li className="nav-item active">
                                <Link to='/my-requests'><a className="nav-link" >See Orders<span className="sr-only"></span></a></Link>
                            </li>
                        </ul>
                        <Logout />
                    </div>
                </nav>
                <main>
                <div className="card text-center mx-auto" style={{ width: '28rem' }}>
                                                            <div className="card-body mx-auto">
                                                              <div>
                                                                    {
                                                                        orders.reverse().map(({ cart, total, phoneNo, address, status }, index) => {
                                                                            return (
                                                                                <div key={index} className="card text-center" style={{ width: '18rem' }}>
                                                                                    <div className="card-body">
                                                                                        <h4 className="card-title">{phoneNo}</h4>
                                                                                        <h4 className="card-title">{address}</h4>
                                                                                        <h2>Total is {total}</h2>
                                                                                        {
                                                                                            
                                                                                            cart.map((cartVal, i) => {
                                                                                                return <ul key={i}>
                                                                                                    <li>
                                                                                                        <p>{cartVal.product} Price <b>{cartVal.productPrice} x {cartVal.quantity}</b></p>
                                                                                                        <small style={status==='pending' ? {color:'red'} : {color:'green'}}> <b>status : {status}</b> </small>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
            
                                                                </div>
                                                            </div>
                                                        </div>
                </main>
            </div>
        </div>
    )
}

