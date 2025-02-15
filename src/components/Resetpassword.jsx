import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import logoicon from "../images/favicon.png"
import { postDataByAxios } from "../axios/axiosConfig"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import CircularProgress from '@mui/material/CircularProgress';
import './resetpassword.css'




const Resetpass = () => {
    // variables/declaration
    const { id, token } = useParams()
    const [userPassword, setuserPassword] = useState('');
    const [toggle, settoggle] = useState(false);
    const [flag1, setflag1] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {

        const postData = async () => {
            try {
                const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/resetpassword/${id}/${token}`, {});

                if (response?.status === 200) {  // Use `status` instead of `statusText`
                    
                }
                
                if (response?.status === 401) {  // Use `status` instead of `statusText`
                    setflag1(false);
                    
                }
                
            } catch (error) {
                setflag1(false);
                
                alert("Error:", error);
                if (error?.response?.status === 401) {
                    alert(error.response?.data?.message);
                    setflag1(false);
                } else {
                    alert("Something went wrong. Please try again.");
                    setflag1(false);  // Ensure flag is reset for other errors too
                }
            }

        }

        postData()



    }, [])





    /////////////////////////////////////////////////////


    // function 

    const handlefieldsvalue = (e) => {
        setuserPassword(e.target.value)

    }






    const handleForgetPassword = async (e) => {
        e.preventDefault();
        settoggle(true)
        try {
            const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/updatepassword`, {userPassword,id});

            if (response?.status === 200) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);
                setuserPassword('')
                settoggle(false)
                navigate("/")
            }
            
            if (response?.status === 500) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);
                setuserPassword('')
                setflag1(false);
            }
        } catch (error) {
            setflag1(false);
            
        }







    }








    ////////////////////////////////////////////////////
    return (
        <div>
            {
                flag1 ? <section className='mainSection'>
                    <Form required className='FoamCard' >
                        <Col className=''>
                            <div className='mb-3'>
                                <span className='div_iconimage'><img className='IconImage' src={logoicon} alt="" /></span>
                            </div>
                            <Form.Group className="mb-3 " controlId="formGroupEmail">
                                <Form.Label className='d-flex' column >Update:</Form.Label>
                                <Form.Control onChange={handlefieldsvalue} value={userPassword} name="password" className='w-100' type="password" placeholder="Enter New Password" />
                            </Form.Group>


                            <Button onClick={handleForgetPassword} className='w-100' variant='primary'> {toggle ? <CircularProgress size={23} color="inherit" /> : "Update Password"}</Button>


                        </Col>
                    </Form>


                </section>
                    :
                    <div className="error-container">
                        <h1>404</h1>
                        <p>Oops! The page you're looking for doesn't exist.</p>
                        <Button href='/' variant='primary'>Login</Button>
                    </div>
            }

        </div >
    );
};

export default Resetpass;