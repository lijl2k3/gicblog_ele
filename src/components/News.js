import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class News extends Component{
    constructor(){
        super();
        this.state={news:[]};
    }

    componentWillMount(){
        let newsStr=localStorage.getItem('news');
        let news=newsStr?JSON.parse(newsStr):[];
        this.setState({news});
    }

    render(){
        return (

            <ul className='list-group'>
                {this.state.news.map(item=>(
                    <li className="list-group-item" key={item.id}>
                        <Link to={"/blog/news/detail/"+item.id}>{item.title}</Link>

                    </li>

                ))
                }
            </ul>
        )
    }

}