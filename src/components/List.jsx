import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faCheckCircle, faCircleInfo, } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import "./List.css"
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import IconChips from './Chips';
import Fade from '@mui/material/Fade';
// or
// import { Fade } from '@mui/material';

const List = (props) => {

    return (


        <Fade timeout={1000} in={true} unmountOnExit>
            <div className='OuterDivClassList'>



                {
                    props.userEmail ? <IconChips user={props.userEmail} /> : ""
                }

                <div className='DivClassList'>


                    <li className={`${props.iscompleted ? "completed" : "notcompleted"}`} key={props.i}> <p className='TodoPara'>{props.todo}</p>  </li>





                    <div className='actionButtonDiv'>
                        <Tooltip TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 300 }}
                            title="Delete">
                            <button onClick={props.HandleDelete} className='listButtons'><span className='ButtonSpan'> <FontAwesomeIcon className='IconsAct deleted' icon={faTrash} /></span></button>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 300 }}
                            title="Completed">
                            <button onClick={() => props.HandleUpdateTodoStatus(props.documentId, props.iscompleted)} className='listButtons'  ><span className='ButtonSpan'> {props.iscompleted ? <FontAwesomeIcon className='IconsAct disabled ' icon={faCheckCircle} /> : <FontAwesomeIcon className='IconsAct completedButton' icon={faCircle} />} </span></button>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 300 }}
                            title="Edit">
                            <button onClick={() => props.HandleUpdateTodo(props.documentId, props.todo, props.iscompleted)} className='listButtons'><span className='ButtonSpan'><FontAwesomeIcon className='IconsAct modify' icon={faPen} /></span></button>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 300 }}
                            title={props.CreatedAt}>
                            <button className='listButtons'><span className='ButtonSpan'><FontAwesomeIcon className='IconsAct modify' icon={faCircleInfo} /></span></button>
                        </Tooltip>

                    </div>
                </div>
            </div >
        </Fade>
    );
};



export default List;