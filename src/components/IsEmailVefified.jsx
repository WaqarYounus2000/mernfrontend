
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { postDataByAxios } from '../axios/axiosConfig';
import CircularProgress from '@mui/material/CircularProgress';
import MailIcon from '@mui/icons-material/Mail';
import './isEmailVerified.css'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const IsEmailVefified = (props) => {

    const [isloading, setisloading] = useState(false)
    const [currentUserEmail, setcurrentUserEmail] = useState('')


    useEffect(() => {

        setcurrentUserEmail(props?.CurrentUser)
        document.title = "Resend Email Verification";

    }, [])


    const Handle_email_resend = async () => {

        try {
            setisloading(true)
            const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/resendEmailVerificationLink`, {});
            if (response?.status === 200) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);


            }

            if (response?.status === 401) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);
                setisloading(false)

            }
            if (response?.status === 500) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);
                setisloading(false)

            }
            setisloading(false)
        } catch (error) {

            setisloading(false)
        }
    }












    return (

        <div>
            <div className="mainContainer">
                <div><MailIcon color='primary' fontSize='large' sx={'margin-bottom:25px'}/></div>
                <h2>Please verify your Email!</h2>
                <p className='para_1'>You are almost there! We send an email to <ArrowDownwardIcon fontSize='small' /></p>
                <p><span className='bold_span'>{currentUserEmail}</span></p>
                <p className=''>Check you mail box to complete your verfication!, if you don't see it you need to <span className='bold_span'> check your spam </span>folder</p>
                <p>Still can't find the email? No Problem</p>
                <Button className='w-45' onClick={Handle_email_resend} variant='primary'>  {isloading ? <CircularProgress size={23} color="inherit" /> : "Resend Verification Email"}</Button>
            </div>
        </div>
    );
};

export default IsEmailVefified;