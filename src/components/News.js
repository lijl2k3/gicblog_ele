import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Table, Layout} from 'element-react';
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
                    prop: "author",
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

    componentWillMount(){
        let newsStr=localStorage.getItem('news');
        let news=newsStr?JSON.parse(newsStr):[];
        news.map(item=>{
            let thedate=new Date(item.date);
            item.date=thedate.getFullYear()+'/'+thedate.getMonth()+1+'/'+thedate.getDate();
            item.link=<Link to={"/news/detail/"+item.id}>{item.title}</Link>;
        });
        this.setState({news});
    }


    render(){
        return (
            <Layout.Row>
                <Layout.Col span="18" offset="3">
            <Table
                    style={{width:'100%'}}
                    columns={this.state.columns}
                    maxHeight={200}
                    data={this.state.news}
             />
                </Layout.Col>
            </Layout.Row>

        )
    }

}