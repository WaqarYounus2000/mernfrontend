
import { useState, useEffect, use } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import List from "./List"
import SnackbarComponent from './Snackbarr';



// import List from './List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Radio, FormControlLabel, Typography } from "@mui/material";
import "./home.css"


///////////////////////////////////
import { postDataByAxios, GetDataByAxios, DeleteDataByAxios, putDataByAxios } from '../axios/axiosConfig';
///////////////////////////////




const MyHome = () => {

    // variables and declaration
    const [inputData, setinputData] = useState('');
    const [CurrentUser, SetCurrentUser] = useState();
    const [Data, SetData] = useState();
    const [Toggled, setToggled] = useState(false);
    const [Did, SetDid] = useState();
    const [triggerFetch, setTriggerFetch] = useState(false)

    const [filteredData, setFilteredData] = useState()
    const [allData, setallData] = useState()


    ///////////////////////////////////////////////////////
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");


    const [selectedValue, setSelectedValue] = useState(false);



    const navigate = useNavigate()





    useEffect(() => {
        console.log("fetching....")
        fetchData()

    }, [triggerFetch])


    const fetchData = async () => {
        try {
            const response = await GetDataByAxios(`${process.env.REACT_APP_BACKEND_API}/todos`)
            SetCurrentUser(response?.data?.email)
            SetData(response?.data.data)
            setallData(response?.data.data)
            const filteredValue = response?.data.data.filter((data) => data.completed === true);
            setFilteredData(filteredValue)

        } catch (error) {
            console.log(error)
        }
    }

    /////////////////////////////// FOR CHECK BOX /////////////////////////////


    const handleChange = () => {
        setSelectedValue(!selectedValue);
        if (selectedValue) {
            SetData(allData)
        } else {
            SetData(filteredData)

        }

    };

    const controlProps = (item) => ({
        checked: selectedValue,
        onClick: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    /////////////////////////////////////////////////////////////////////////////////


    const HandleDelete = async (deleteId) => {
        try {
            const response = await DeleteDataByAxios(`${process.env.REACT_APP_BACKEND_API}/todos/${deleteId}`)
            setTriggerFetch(prev => !prev)
            showSnackbar("Todo Deleted!.", "error")
        } catch (error) {
            console.log(error)

        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    const HandleAddTodos = async () => {
        if (inputData != '') {
            try {
                const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/todos`, { "task": inputData })
                if (response.statusText === "Created") {
                    setTriggerFetch(prev => !prev)
                    setinputData('')
                    showSnackbar("Todo Added! ", "success")
                }
            } catch (e) {
                showSnackbar("Error Adding Data! ", "error")
            }
        }
        else {
            showSnackbar("Input the data! ", "error")
            setinputData('')
        }
    }
    /////////////////////////////////////////////////////////////////////////////////
    const HandleUpdateTodoStatus = async (StatusDocId, currentStatus) => {
        try {
            const response = await putDataByAxios(`${process.env.REACT_APP_BACKEND_API}/todos/${StatusDocId}`, { "completed": !currentStatus })
            if (response.statusText === "OK") {
                // SetCurrentTodoStatus(currentStatus)
                showSnackbar("Todo-Updated!.", "success")
                setTriggerFetch(prev => !prev)
                setinputData('')
            }
            setToggled(false)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////
    const HandleUpdateTodo = (iD, todo, currentStatus) => {
        if (!currentStatus) {
            SetDid(iD)
            setinputData(todo)
            setToggled(true)
        } else {
            showSnackbar("Cannot Update Completed Task!.", "error")
        }
    }

    /////////////////////////////////////////////////////////////////////////////////

    const HandleUpdateDocument = async () => {
        try {
            const response = await putDataByAxios(`${process.env.REACT_APP_BACKEND_API}/todos/${Did}`, { "task": inputData })
            setToggled(false)
            if (response.statusText === "OK") {
                showSnackbar("Todo-Updated", "info")
                setTriggerFetch(prev => !prev)
                setinputData('')
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    /////////////////////////////////////////////////////////////////////////////////
    const HandleLogOut = async () => {
        try {

            const response = await postDataByAxios(`${process.env.REACT_APP_BACKEND_API}/logout`, {})
            console.log(response)
            if (response.statusText === "OK" || response.status === 200) {
                console.log("user loged out!")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }


    ////////////// snackBar functions//////////////////

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    //////////////////////////////////////////////////









    return (
        <div>
            <>


                {/* /////////////////////////////SnackBar code//////////////////////////////////// */}
                <div>
                    <SnackbarComponent
                        message={snackbarMessage}
                        severity={snackbarSeverity}
                        open={snackbarOpen}
                        handleClose={handleSnackbarClose}
                    />
                </div>
                {/* /////////////////////////////SnackBar code//////////////////////////////////// */}
                <div className='TodsTitleBox'>
                    <div className='UserAccountInfo'>
                        <h5><FontAwesomeIcon icon={faUser} /> <span className='currentUser'>{CurrentUser}</span> </h5>
                        <Button onClick={HandleLogOut}>Logout</Button>
                    </div>
                    <Form.Group className="mb-3 fullwidth " controlId="formGroupEmail">
                        <Form.Label className='d-flex' column >Enter Todo's</Form.Label>
                        <Form.Control onChange={(e) => { setinputData(e.target.value) }} value={inputData} name="text" className='w-100' type="text" placeholder="Type Here" />
                        {Toggled ? <Button onClick={HandleUpdateDocument} className='w-30 mt-3' variant='primary'>Update <FontAwesomeIcon icon={faCirclePlus} /></Button> : <Button onClick={() => {

                            HandleAddTodos()
                        }
                        } className='w-30 mt-3' variant='primary'>Add <FontAwesomeIcon icon={faCirclePlus} /></Button>
                        }
                    </Form.Group>

                </div>

                {/* ////////////////////////// completed task check box */}

                <FormControl>
                    <FormControlLabel label={<Typography> Completed</Typography>} control={<Radio {...controlProps()} color="default" />} />
                </FormControl>


                {/* ////////////////////////// completed task check box */}


                <div className='Todo_section'>
                    <h2>Tasks:</h2>


                    <ol className='OrderListClass'>


                        {

                            Data?.map((e, i) => {
                                return (

                                    <List key={i} userEmail={e?.userEmail} HandleUpdateTodo={HandleUpdateTodo} HandleUpdateTodoStatus={HandleUpdateTodoStatus} documentId={e._id} iscompleted={e.completed} todo={e.task} i={i} CreatedAt={e.createdAt} HandleDelete={() => { HandleDelete(e._id) }} />


                                )
                            })

                        }

                    </ol>


                </div>
            </>

        </div>
    );
};

export default MyHome;