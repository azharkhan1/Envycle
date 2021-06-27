import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import url from "../core/index";

import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'
import "./css/dashboard.css";
import "./css/userdashboard.css";
import "../components/drawer";

// import global state
import { useGlobalState, useGlobalStateUpdate } from "../context/index";

// importing components
import Logout from '../components/logout'

// Importing link from react router dom
import {
    Link
} from 'react-router-dom';
import { CardTravelSharp } from "@material-ui/icons";
import TemporaryDrawer from "../components/drawer";

axios.defaults.withCredentials = true









export default function UserDashboard() {

    const globalState = useGlobalState();
    var [products, setProducts] = useState([]);
    var [cart, setCart] = useState([]);
    var [change, setChange] = useState(true);
    var [orderMessage, setMessage] = useState("Materials");
    var address = useRef();
    var phoneNo = useRef();
    var remarks = useRef();



    useEffect(() => {

        axios({
            method: 'get',
            url: `${url}/get-materials`
        }).then((res) => {
            setProducts(res.data.materials);
        }).catch((err) => {
            alert('some error occoured');
        })

    }, [change])


    function addCart(value, index) {
        var products_change = [...products];
        products_change[index].added = true;
        setProducts(products_change);

        var valueToAdd = {
            product: value.name,
            quantity: 5,
            _id: value._id,
        }
        setCart([...cart, valueToAdd]);
        setMessage("Materials (minimum 20kg)");
    }
    function addQty(index) {
        var prevCart = [...cart];
        prevCart[index].quantity += 5;
        setCart(prevCart);

    }

    const removeCart = (index) => {


        for (let i = 0 ; i<cart.length;i++)
        {
            if (products[index]._id === cart[i]._id)
            {
                var products_change = [...products];
                let old_cart = [...cart]
                old_cart.splice(i, 1);
                setCart(old_cart);
                products_change[index].added = false;
                setProducts(products_change);
                break;
            }
            
        }

    }

    function removeQty(index) {

        if (cart[index].quantity > 5) {
            var prevCart = [...cart];
            prevCart[index].quantity -= 5;
            setCart(prevCart);
        }
        else {
            var products_change = [...products];
            for (let i = 0; i < products.length; i++) {
                if (cart[index]._id === products[i]._id) {
                    products_change[i].added = false;
                }
                else {
                    console.log('not matched');
                }
            }
            let old_cart = [...cart]
            old_cart.splice(index, 1);
            setProducts(products_change);
            setCart(old_cart);
        }
    }

    function checkOut(e) {
        e.preventDefault();

        var totalQuantity = 0;
        cart.map((value => {
            totalQuantity += value.quantity;
        }))

        if (totalQuantity < 20) {
            setMessage('Include 20KG atleast');
            document.getElementById('order-message').style.color = 'red';
            return
        }

        axios({
            method: 'post',
            url: `${url}/place-order`,
            data: {
                cart: cart,
                address: address.current.value,
                phoneNo: phoneNo.current.value,
                quantity: totalQuantity,
                remarks: remarks.current.value,
            },

        }).then((response) => {
            setMessage("Your request has been placed");
            document.getElementById('order-message').style.color = 'black';

            cart.map((value) => {
                value.quantity = 0
                setCart([]);
            });

        }, (error) => {
        })
        products.map((value) => value.added = false);
    }



    return (
        <div>
            <div className="wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                <li>
                                    
                                    </li>
                            </ul>

                            <Logout />
                        </div>
                    </div>
                </nav>
                <main>
                    <div className="main-section">
                        <div className="container">
                            <div className="main-section-data">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 no-pd col-sm-4 col-xs-12">
                                        <div className="main-ws-sec">
                                            <div className="posts-section">

                                                <div className="row">
                                                    {
                                                        products.map((value, index) => {
                                                            return <div className='col-md-6' key={index}>
                                                                <div  className="card  mt-2 mx-auto text-center px-4 py-4" style={{ width: "15rem" }} >
                                                                    <img src={value.url} className="material" alt="..." />
                                                                    <div className="card-body">
                                                                        <div className="gradient-img">
                                                                        </div>
                                                                        <h4 className='product-name' style={{ color: "black" }}>{value.name}</h4>

                                                                    </div>

                                                                    <button onClick={value.added ? () => { removeCart(index) } : (e) => addCart(value, index)} className="cart-btn">{value.added ? "Remove" : "Add"}</button>

                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 pd-right-none no-pd">
                                        <div className="right-sidebar">
                                            <div className="widget widget-about">
                                                <img src="images/wd-logo.png" alt="" />
                                                <h3 id='order-message'>{orderMessage}</h3>
                                                <div className="sign_link">
                                                    <div className="card text-center" style={{ width: '18rem', margin: '0 auto' }}>
                                                        {

                                                            cart.map((value, index) => {
                                                                return <div className="card-body" key={index}>
                                                                    <h5 className="card-title">{value.product} (kg)</h5>

                                                                    <div className="quantity buttons_added">
                                                                        <input onClick={value.quantity > 0 ? (e) => removeQty(index) : () => { return }} type="button" defaultValue="-" className="minus" />
                                                                        <input style={{ textAlign: "center", width: 34 }} type="text" value={value.quantity} className="input-text qty text" disabled />
                                                                        <input onClick={(e) => addQty(index)} type="button" defaultValue="+" className="plus" />
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                        {
                                                            cart.length > 0
                                                                ?
                                                                <form onSubmit={cart.length > 0 ? (e) => checkOut(e) : () => { return }}>
                                                                    <div className="form-row">
                                                                        <div className="form-group col-md-10 mx-auto">
                                                                            <label htmlFor="inputEmail4">Enter Address</label>
                                                                            <input ref={address} required type="name" className="form-control" id="inputEmail4" placeholder="Pickup Address" />
                                                                        </div>
                                                                        <div className="form-group col-md-10 mx-auto">
                                                                            <label htmlFor="inputPassword4">Enter Phone Number</label>
                                                                            <input ref={phoneNo} required type="text" className="form-control" placeholder="Enter Phone" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group col-md-12">
                                                                        <label htmlFor="exampleFormControlTextarea1">Your Message here</label>
                                                                        <textarea className="form-control" rows={3} defaultValue={""}
                                                                            ref={remarks}
                                                                            placeholder='Enter remarks'
                                                                        />
                                                                    </div>
                                                                    {/* </div> */}
                                                                    <button type="submit" className="btn btn-primary">Place Request</button>
                                                                </form>
                                                                : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
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


 // var [products, setProducts] = useState([
    //     {
    //         product: 'Cardboard',
    //         url: "data:image/jpeg;base64,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"
    //     },
    //     {
    //         product: 'Tin',
    //         description: "Iphone 6 charger with original datacable and plug ",
    //         url: "https://www.arzaan.pk/wp-content/uploads/2018/10/genuine-apple-iphone-8-7-charger-3949-p.jpg"
    //     },
    //     {
    //         product: 'Plastic',
    //         url: "https://sc01.alicdn.com/kf/H8b7e318ad25a41c6b0185ac35e6405408.jpg_350x350.jpg",
    //     },
    //     {
    //         product: 'Cloth',
    //         url: "https://sc01.alicdn.com/kf/H8b7e318ad25a41c6b0185ac35e6405408.jpg_350x350.jpg",
    //     },

    // ])