import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Table, Layout,Breadcrumb} from 'element-react';
import BreadcumbBar from './BreadcumbBar';
import PageBar from './PageBar';
import {_newsList,_total} from "../api/newsApi";
import FilterBar from './FilterBar';
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
            total:0,
            form:{}

        };
    }

    handleSearch=(form)=>{this.state.form=form;
                            this.forceUpdate();
                            this.newsList();
                            this.newsTotal();
    }

    handleReset=()=>{this.state.form={};
        this.refs.filterbar.state.form={};
        this.forceUpdate();
        this.newsList();
        this.newsTotal();
    }



    async newsList(){
        let cur=this.refs.pagebar.state.cur;
        let psize=this.refs.pagebar.state.psize;

        let data={
            start:(cur-1)*psize,
            count:psize
        }

        if(Object.keys(this.state.form).length>0){
            for (let index in this.state.form){
                if(this.state.form[index]!=='')
                data[index]=this.state.form[index];
            }
        }
        const res=await _newsList(data);
        let news= res.data.data;
        news.map(item=>{
                let thedate=new Date(item.create_time*1000);
            item.date=thedate.getFullYear()+'/'+parseInt(thedate.getMonth()+1)+'/'+thedate.getDate();
                item.link=<Link to={"/news/detail/"+item.id}>{item.title}</Link>;
            });
        this.setState({news});
    }

    async newsTotal(){
        let data={};
        if(Object.keys(this.state.form).length>0){
            for (let index in this.state.form){
                if(this.state.form[index]!=='')
                    data[index]=this.state.form[index];
            }
        }
        const res_num=await _total(data);
        let num=res_num.data.data;
        this.setState({total:num});
    }

    componentDidMount(){
        this.newsList();
        this.newsTotal();
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
                <FilterBar handleSearch={this.handleSearch} handleReset={this.handleReset} ref="filterbar" />
                <Layout.Row>
                    <Layout.Col span="24" >
                        <Table
                            style={{width:'100%'}}
                            columns={this.state.columns}
                            data={this.state.news}
                        />
                        <div style={{'float':'right'}}>
                            <PageBar ref='pagebar' handleList={this.newsList.bind(this)} total={this.state.total} />
                        </div>
                    </Layout.Col>

                </Layout.Row>

            </div>
        )
    }

}