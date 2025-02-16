

import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import logoicon from "../images/favicon.png"
import { postDataByAxios } from "../axios/axiosConfig"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CircularProgress from '@mui/material/CircularProgress';
import './forgotpassword.css'



const Forgotpass = () => {
    // variables/declaration
    const [userEmail, setuserEmail] = useState('');
    const [toggle, settoggle] = useState(false);

    const navigate = useNavigate()





    /////////////////////////////////////////////////////


    // function 

    const handlefieldsvalue = (e) => {
        setuserEmail(e.target.value)

    }






    const handleForgetPassword = async (e) => {
        e.preventDefault();
        settoggle(true)


        try {
            const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/forgetpassword`, { userEmail })
            console.log(response)

            if (response.status === 200) {
                settoggle(false)
                alert(response?.data.message)
                setuserEmail('')
                navigate("/")
            }




        } catch (error) {
            if (error?.response?.status === 404) {
                alert(response?.data.message)
                return
            }
            if (error?.response?.status === 500) {
                alert(error.response?.data?.message)
                settoggle(false)
            }
        }





    }








    ////////////////////////////////////////////////////
    return (
        <div>
            <section className='mainSection'>
                <Form required className='FoamCard' >
                    <Col className=''>
                        <div className='mb-3'>
                            <span className='div_iconimage'><img className='IconImage' src={logoicon} alt="" /></span>
                        </div>
                        <Form.Group className="mb-3 " controlId="formGroupEmail">
                            <Form.Label className='d-flex' column >Email:</Form.Label>
                            <Form.Control onChange={handlefieldsvalue} value={userEmail} name="email" className='w-100' type="email" placeholder="Enter Registered Email" />
                        </Form.Group>


                        <Button onClick={handleForgetPassword} className='w-100' variant='primary'> {toggle ? <CircularProgress size={23} color="inherit" /> : "Send Email"}</Button>


                    </Col>
                </Form>


            </section>
        </div >
    );
};

export default Forgotpass;