import React,{Component} from 'react';
export default class NewsDetail extends Component{
    render(){
        let id=this.props.match.params.id;
        let news=JSON.parse(localStorage.getItem('news'));
        let item=news.find(item=>item.id==id);
        console.log(item.id);
        return (
            <div>
                <h2>{item.title}</h2>
                <span>{item.contents}</span>
            </div>
        )
    }

}