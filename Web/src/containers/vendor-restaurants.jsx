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

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

export default function AddRestaurant() {
    const classes = useStyles();
    const [restaurants, setRestaurants] = React.useState([]);
    const [change, handleChange] = React.useState();
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
    }, [change])

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
            handleChange(!change);
        }, (error) => {
            alert(error);
            console.log('error is=>', error);

        })
    }

    return (
        <div >
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
                <div style={{height:'100vh',backgroundColor:'#08674bc3' }}>

                    <div className="container mx-auto text-center ">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 no-pd">
                                    <div className="main-ws-sec mt-4    ">
                                        <form onSubmit={AddRestaurant}>
                                            <div className="form-row align-items-center">
                                                <div className="col-md-5">
                                                    <input type="text" required  className="form-control mb-2" id="name" placeholder="Restaurant Name" />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="text" required  className="form-control" id="location" placeholder="Location" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">

                                                    <div className="input-group mb-2">
                                                        <input type="number" required  className="form-control" id="passcode" placeholder="Voucher passcode" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="number" required  className="form-control" id="discount" placeholder="Discount to be given" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="number" required className="form-control" id="points" placeholder="Voucher points" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mx-auto ">
                                                    <button type="submit" className="btn btn-primary mb-2 add-btn">Add Restaurant</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                            <div style={{margin: '0 auto'}}>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Restaurant</StyledTableCell>
            <StyledTableCell align="right">Location&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Passcode&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Discount&nbsp; </StyledTableCell>
            <StyledTableCell align="right">Voucher Points&nbsp; </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((row) => (
              <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.passcode}</StyledTableCell>
              <StyledTableCell align="right">{row.discount}</StyledTableCell>
              <StyledTableCell align="right">{row.points} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

                </div>
                            </div>
                        </div>
                
          </div>
            
                
          </div>
    

    )
}