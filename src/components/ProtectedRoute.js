import React from 'react';
import {Redirect,Route} from 'react-router-dom';
export default function ({component:Component, ...rest}) {
    return <Route {...rest}
        render={(props)=>
            (sessionStorage.getItem('login')=='true')?<Component history={props.history} />:<Redirect to={{
                pathname:'/login',
                state:{from:props.location.pathname
                }
            }}/>
        }
    />
}