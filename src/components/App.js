import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import User from './User';
import News from './News';
import NewsAdd from './NewsAdd';
import GalleryAdd from './GalleryAdd';
import {Menu}  from 'element-react';
import 'element-theme-default';
require('../App.css');
export default class App extends Component {
    onSelect(index){
        console.log(index);
    }
    render() {
        return(
        <Router>
            <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal"
                      onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1"><Link to='/home'>Home</Link></Menu.Item>
                    <Menu.SubMenu index="2" title="Documents">
                        <Menu.Item index="2-1"><Link to='/news' style={{'textDecoration':'none'}}>Document List</Link></Menu.Item>
                        <Menu.Item index="2-2"><Link to='/newsAdd' style={{'textDecoration':'none'}}>Add Document</Link></Menu.Item>
                        <Menu.Item index="2-3"><Link to='/galleryAdd' style={{'textDecoration':'none'}}>Add Gallery</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="3" title="My Account">
                        <Menu.Item index="3-1">My Favorite</Menu.Item>
                        <Menu.Item index="3-2">My Documents</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="4">My Settings</Menu.Item>
                </Menu>
                <div className='container'>
                    <div className="row">
                        <div className="col-sm-12">
                            <Route path='/home' component={Home}/>
                            <Route path='/news' component={News}/>
                            <Route path='/newsAdd' component={NewsAdd}/>
                            <Route path='/galleryAdd' component={GalleryAdd}/>
                            <Route path='/user' component={User}/>
                        </div>
                    </div>
                </div>

            </div>
        </Router>
        )
    }
}