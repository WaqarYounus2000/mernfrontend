import React from 'react';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from 'react-router-dom';
import logoicon from "../images/favicon.png"
import { postDataByAxios } from "../axios/axiosConfig"
import SnackbarComponent from './Snackbarr';


import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CircularProgress from '@mui/material/CircularProgress';
import './login.css'


const Login = () => {
    // variables/declaration
    const [userDetails, setuserDetails] = useState({ email: "", password: "" });
    const [toggle, settoggle] = useState(false);
    const Navigate = useNavigate();







    ///////////////////////////snack bar functions//////////////////////////

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    ///////////////////////////snack bar functions//////////////////////////



    let fieldName, fieldValue
    const handlefieldsvalue = (event1) => {
        fieldName = event1.target.name
        fieldValue = event1.target.value
        setuserDetails({ ...userDetails, [fieldName]: fieldValue })
        // console.log(userDetails);
    }






    const handleLogin = async (e) => {
        console.log("login....")

        if (userDetails.email === '' || userDetails.password === '') {
            // alert("Fill all the fields!")
            showSnackbar("Fill all the fields!", "info")
            return
        }

        console.log("first....")

        e.preventDefault();
        settoggle(true)
        console.log("second....")
        console.log(userDetails)

        const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/login`, userDetails)
        console.log(response)
        console.log("third....")



        if (response.statusText === "Internal Server Error" || response.status === 500) {

            showSnackbar(response.data.message, "error")
            settoggle(false)
            return

        }
        if (response.statusText === "Unauthorized" || response.status === 401) {

            showSnackbar(response.data.message, "error")
            settoggle(false)
            return

        }
        if (response.statusText === "Not Found" || response.status === 404) {

            showSnackbar(response.data.message, "error")
            settoggle(false)
            return

        }

        if (response.statusText === "OK" || response.status === 200) {
            showSnackbar(response.data.message, "success")
            settoggle(false)
            Navigate("/home")
            return

        }



    }








    ////////////////////////////////////////////////////
    return (
        <div>
            <SnackbarComponent
                message={snackbarMessage}
                severity={snackbarSeverity}
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
            />
            <section className='mainSection'>
                <Form required className='FoamCard' >
                    <Col className=''>
                        <div className='mb-3'>
                            <span className='div_iconimage'><img className='IconImage' src={logoicon} alt="" /></span>
                        </div>
                        <Form.Group className="mb-3 " controlId="formGroupEmail">
                            <Form.Label className='d-flex' column >Email:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userDetails.email} name="email" className='w-100' type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label className='d-flex'>Password:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userDetails.password} name="password" type="password" placeholder="Password" />
                        </Form.Group>

                        <div className='registerDiv'>

                            <Link to={"/register"}>Not a member ? Register here</Link>

                        </div>


                        <Button onClick={handleLogin} className='w-100' variant='primary'> {toggle ? <CircularProgress size={23} color="inherit" /> : "Login"}</Button>
                        <div>
                            <br />
                            <Link to={"/forgetpassword"}>
                                <Button className='w-100' variant='primary'>Forget Password</Button>
                            </Link>
                        </div>

                    </Col>
                </Form>


            </section>
        </div >
    );
};

export default Login;