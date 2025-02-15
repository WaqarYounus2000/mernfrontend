import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './register.css'
import { CircularProgress } from '@mui/material';
import logoicon from "../images/favicon.png"
import { postDataByAxios } from '../axios/axiosConfig';
import SnackbarComponent from './Snackbarr';

const Register = () => {
    // Variables/declaration
    const [userDetails, setuserDetails] = useState({ email: "", password: "", phone: "", name: "" });
    const Navigate = useNavigate();
    const [toggle, settoggle] = useState(false);


    ////////////////////// snackbars //////////////////////////////////

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

    ////////////////////// snackbars //////////////////////////////////

    // functions 
    let fieldName, fieldValue
    const handlefieldsvalue = (event1) => {
        fieldName = event1.target.name
        fieldValue = event1.target.value
        setuserDetails({ ...userDetails, [fieldName]: fieldValue })

    }

    const handleRegistration = async (e) => {
        e.preventDefault(); // Prevent form submission at the start

        try {
            // Check if all fields are filled
            if (!userDetails.email || !userDetails.phone || !userDetails.password) {
                showSnackbar("Fill all the fields!", "info");
                return;
            }

            settoggle(true);

            const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/registration`, userDetails);


            if (response.status === 409) {
                showSnackbar(response.data.message, "error");
                settoggle(false);
            }


            if (response.status === 201) { // Check for 201 Created status
                settoggle(false);
                showSnackbar("Registered User || A verification link is sent", "success");
                Navigate("/"); // Ensure `Navigate` is correctly imported and used
                return;
            }

        } catch (error) {
            settoggle(false);
            showSnackbar(error.message, "error");
        }
    };











    /////////////////////////////////////////////////////////
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

                        <Form.Group className="mb-3 " controlId="formGroupName">
                            <Form.Label required className='d-flex' column >Name:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userDetails.name} name="name" className='w-100' type="name" placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupContact">
                            <Form.Label className='d-flex'>Contact:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userDetails.phone} name="phone" type="contact" placeholder="Contact No" />
                        </Form.Group>
                        <Form.Group className="mb-3 " controlId="formGroupEmail">
                            <Form.Label className='d-flex' column >Email:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userDetails.email} name="email" className='w-100' type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label className='d-flex'>Password:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userDetails.password} name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <div className='loginDivInregistration'>
                            <Link to={"/"}>Already Registered ? Login here</Link>

                        </div>
                        <Button onClick={handleRegistration} className='w-100' variant='primary'> {toggle ? <CircularProgress size={23} color="inherit" /> : "Reigster"}</Button>


                    </Col>
                </Form>


            </section>
        </div >
    );
};

export default Register;