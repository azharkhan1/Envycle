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
    const globalState = useGlobalState();
    const [orders, setOrders] = React.useState([]);
    const [change, handleChange] = React.useState(true);
    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/myorders`,
        }).then((response) => {
            var userRequests = response.data.placedRequests.slice().reverse();
            setOrders(userRequests);
        }, (error) => {
            console.log("an error occured");
        })
    }, [change])

    const deleteOrder = (id) => {
        axios({
            method: 'delete',
            url: `${url}/delete-order`,
            data: {
                id: id,
            },
        }).then((response) => {
            alert(response.data.message);
            handleChange(!change);
        }).catch((error) => {
            alert('server error');
        })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className='container'>
                    <Link className="navbar-brand" to='/'>{globalState.user.userName}</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/'><a className="nav-link" >Home <span className="sr-only">(current)</span></a></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/my-requests'><a className="nav-link" >See Requests<span className="sr-only"></span></a></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/redeem-voucher'><a className="nav-link" >Redeem Voucher<span className="sr-only"></span></a></Link>
                            </li>
                        </ul>
                        <Logout />
                    </div>
                </div>
            </nav>
            <div className='section'>

            <div className='container '>
                <div className='row '>
                    {
                        orders.map(({ cart, total, phoneNo, address, status, _id }, index) => {
                            return (
                                <div key={index} className='col-md-4 col-sm-12 '>
                                    <div  className="card-body mb-4" style={{ boxShadow: "0 0 6px grey", height: '300px' }}>
                                        <div className='mt-2 px-2 py-2'>
                                            <span className='float-left heading' >Status:</span> <span className={status === 'Pending' ? 'text-warning float-right' : status === 'Declined' ? 'text-danger float-right' : 'text-success float-right'}>{status}</span>
                                        </div>
                                        <hr />
                                        <div className='mt-2  px-2 py-2'>
                                            <span className="float-left heading" >Phone: </span> <span className="float-right">{phoneNo}</span>
                                        </div>
                                        <hr />
                                        <div className='mb-2  px-2 py-2'>
                                            <span className="float-left">Address: </span> <span className="float-right">{address}</span>
                                        </div>
                                        <hr />

                                        {
                                            
                                            cart.map((cartVal, i) => {
                                                return <ul key={i}>
                                                    <li>
                                                        <p>{cartVal.product ? cartVal.product : cartVal.name} <b> x {cartVal.quantity} KG</b></p>
                                                    </li>
                                                </ul>
                                            })
                                        }
                                        {
                                            status === 'Pending' ?
                                            <div className='text-center'>
                                                    <button onClick={() => deleteOrder(_id)} className="btn btn-danger mb-2 w-100">Cancel Request</button>
                                                </div>
                                                : ''
                                            }
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
                    </div>

    )
}

