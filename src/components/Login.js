import React from 'react';
import {Button} from 'element-react';
export default function (props) {
    return(<Button type='primary' onClick={
        ()=>{localStorage.setItem('login',true);
            props.history.push(props.location.state.from);
        }
    }>Login</Button>)

}