import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Table, Layout,Breadcrumb} from 'element-react';
import BreadcumbBar from './BreadcumbBar';
import {_newsList} from "../api/newsApi";
export default class News extends Component{
    constructor(){
        super();
        this.state={news:[],
            columns: [
                {
                    label: "Title",
                    prop: "link",

                },
                {
                    label: "Author",
                    prop: "uname",
                    width: 180
                },
                {
                    label: "Publish Date",
                    prop: "date",
                    width:180
                }
            ],

        };
    }

    async newsList(){
        const res=await _newsList();
        let news= res.data.data;
        console.log(news);
        news.map(item=>{
                let thedate=new Date(item.create_time*1000);
            item.date=thedate.getFullYear()+'/'+parseInt(thedate.getMonth()+1)+'/'+thedate.getDate();
                item.link=<Link to={"/news/detail/"+item.id}>{item.title}</Link>;
            });
        this.setState({news});
    }

    componentWillMount(){
        this.newsList();
        // let news=newsStr?JSON.parse(newsStr):[];
        // news.map(item=>{
        //     let thedate=new Date(item.date);
        //     item.date=thedate.getFullYear()+'/'+thedate.getMonth()+1+'/'+thedate.getDate();
        //     item.link=<Link to={"/news/detail/"+item.id}>{item.title}</Link>;
        // });
        // this.setState({news});

    }


    render(){
        return (
            <div className="row">
                <BreadcumbBar nav_arr={['News','News List']} />
            <Layout.Row>
                <Layout.Col span="18" offset="3">
            <Table
                    style={{width:'100%'}}
                    columns={this.state.columns}
                    data={this.state.news}
             />
                </Layout.Col>
            </Layout.Row>
            </div>
        )
    }

}