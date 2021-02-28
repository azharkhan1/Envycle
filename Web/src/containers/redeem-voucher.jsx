import React, { useEffect } from "react";
import { useGlobalState } from '../context'
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
    const [restaurants, setRestaurants] = React.useState([]);
    const globalState = useGlobalState();

    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/get-restaurants`
        }).then((response) => {
            setRestaurants(response.data.restaurants)
            console.log('response is =>', response.data.restaurants);
        }).catch((err) => {
            alert('server error please refresh page or check internet');
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
                            <li className="nav-item active">
                                <Link to='/redeem-voucher'><a className="nav-link" >Redeem Voucher<span className="sr-only"></span></a></Link>
                            </li>

                        </ul>
                        <Logout />
                    </div>
                </nav>
                <main>
                    {
                        restaurants.map(({name,location,passcode,discount,points},index) => {
                            return <div key={index} className="card mx-auto" style={{ width: '18rem' }}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{name}</h5>
                                    <p className="card-text">{location}</p>
                                    <p>Points to avail this voucher: {points}</p>
                                    <small className="card-text">{parseInt(globalState.user.points) >= points ? `DISCLAIMER : To avail the voucher visit ${name} they will enter passcode for discount` : `Need ${points} points for discount`}</small>
                                    <button className="btn btn-primary">{parseInt(globalState.user.points) >= points ? `Reddem ${name} Voucher` : `Need ${points} Point to Redeem`}</button>
                                </div>
                            </div>

                        })


                    }
                </main>




            </div>
        </div>
    )
}

