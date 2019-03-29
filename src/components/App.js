import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Blog from './Blog';
import User from './User';
import News from './News';
import NewsAdd from './NewsAdd';
import EventsAdd from './EventsAdd';
import GalleryAdd from './GalleryAdd';
import NewsDetail from './NewsDetail';
import NewsEdit from './NewsEdit';
import {_logout} from "../api/userApi";
import MyDoc from './MyDoc';
import {Menu, Button}  from 'element-react';
import ProtectedRoute from './ProtectedRoute';
import 'element-theme-default';
import HeadBar from './HeadBar';
require('../App.css');
export default class App extends Component {

    render() {
        return(
        <Router>
            <div>

                <div className='container'>

                    <div className="row">
                        <div className="col-sm-12">
                            <Route path='/login' component={Login}/>
                            <Route path='/logout' component={Logout}/>
                            <Route exact path='/' component={Home}/>
                            <Route path='/home' component={Home}/>
                            <Route exact path='/news' component={News}/>
                            <ProtectedRoute path='/newsAdd' component={NewsAdd}/>
                            <ProtectedRoute path='/eventsAdd' component={EventsAdd}/>
                            <ProtectedRoute exact path='/user' component={User}/>
                            <Route path='/news/detail/:id' component={NewsDetail}/>
                            <ProtectedRoute path='/news/edit' component={NewsEdit}/>
                        </div>
                    </div>
                </div>

            </div>
        </Router>
        )
    }
}