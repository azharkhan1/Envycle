  
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

// Importing styles
import "./css/app.css";
import './css/style.css'

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

export default function AddProduct() {
    const classes = useStyles();

    const globalState = useGlobalState();
    var [materials, setMaterials] = useState([]);

    useEffect(() => {

        axios({
            method: 'get',
            url: `${url}/get-materials`
        }).then((res) => {
            console.log('', res.data.materials);
            setMaterials(res.data.materials);
        }).catch((err) => {
            alert('some error occoured');
        })

    }, [])
    const addProduct = (e) => {
        console.log('url is=>',url);
        e.preventDefault();
        axios({
            method: 'post',
            url: `${url}/add-materials` ,
            data: {
                name: document.getElementById('name').value,
                url: document.getElementById('imageurl').value,
            },
        }).then((response) => {
            console.log("response", response);
            alert('added succesfully');
            document.getElementById('imageurl').value = '';
            document.getElementById('name').value = '';

        }, (error) => {
            alert(error);
            console.log('error is=>',error);

        })
    }

    return (
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
                                <Link to='/checkorders'><a className="nav-link" >See Orders<span className="sr-only"></span></a></Link>
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
            <main>
                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="main-ws-sec">
                                        <form onSubmit={addProduct}>
                                            <div className="form-row align-items-center">
                                                <div className="col-md-5">
                                                    <input type="text" className="form-control mb-2" id="name" placeholder="Material Name" />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="input-group mb-2">
                                                        <input type="text" className="form-control" id="imageurl" placeholder="Image url" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mx-auto ">
                                                    <div>
                                                        
                                                    </div>
                                                    <button type="submit" className="btn mb-2 text-center mx-auto" style={{    backgroundColor:'#014732' , color:'white'}}>Add Material</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                    <div className='row'>
                            <div style={{margin: '0 auto'}}>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Image Url&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materials.map((row) => (
              <StyledTableRow key={row.name}>
          
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell className='float-right' align="right"><img src={row.url} style={{width:100 , height:80}}/></StyledTableCell>
            
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
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}