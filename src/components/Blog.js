import React,{Component} from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import News from './News';
import Gallery from './Gallery';
import NewsDetail from './NewsDetail';
import NewsAdd from './NewsAdd';
export default class Blog extends Component{
    render(){
        return (
            <div className="row">
                <div className="col-sm-2">
                    <ul className="nav nav-stacked">
                        <li><Link to="/blog/news">News</Link></li>
                        <li><Link to="/blog/news/add">Add News</Link></li>
                        <li><Link to="/blog/gallery">Gallery</Link></li>
                    </ul>
                </div>
                <div className="col-sm-10">
                    <Route exact path='/blog/news' component={News} />
                    <Route path='/blog/gallery' component={Gallery} />
                    <Route path='/blog/news/detail/:id' component={NewsDetail} />
                    <Route path='/blog/news/add/' component={NewsAdd} />
                </div>
            </div>
        )
    }

}