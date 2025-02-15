import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postDataByAxios } from "../axios/axiosConfig"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import VerifiedIcon from '@mui/icons-material/Verified';

import CircularProgress from '@mui/material/CircularProgress';
import './emailverfication.css'




const EmailVerifcationCom = () => {
    // variables/declaration
    const { id, token } = useParams()
    const [user_id, setid] = useState('');
    const [user_Token, setToken] = useState('');
    const [toggle, settoggle] = useState('verify');


    useEffect(() => {

        setToken(token)
        setid(id)
        document.title = 'Verify Your Email';

    }, [])


    const Handle_verify_email = async () => {

        try {
            settoggle('verifying')
            const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/updateIsEmailVerified`, { user_id, user_Token });
            if (response?.status === 200) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);

                settoggle('verify')
                // navigate("/")
            }

            if (response?.status === 401) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);
                settoggle('verify');
            }
            if (response?.status === 500) {  // Use `status` instead of `statusText`
                alert(response?.data?.message);
                settoggle('verify');
            }
            settoggle('verified')
        } catch (error) {
            settoggle('verify');

        }




    }










    ////////////////////////////////////////////////////
    return (

        <>





            <div>
                <div className="mainContainerEmailVerification">
                    <div><span><VerifiedIcon fontSize="large" color='primary' sx={"margin-bottom:10px"}/></span></div>
                    <h3>Verify Your Email!</h3>
                    <p>Click verify button to complete verification process.</p>
                    <Button className='w-50' disabled={toggle === 'verify' ? false : true} onClick={Handle_verify_email}>{toggle === 'verify' ? 'Verify Your Email' : toggle === 'loading' ? <CircularProgress size={23} color="inherit" /> : "Verified"}</Button >
                </div>
            </div>
        </>



    );
};

export default EmailVerifcationCom;