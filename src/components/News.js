import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Table, Layout,Breadcrumb,MessageBox,Button} from 'element-react';
import BreadcumbBar from './BreadcumbBar';
import PageBar from './PageBar';
import {_newsList,_total} from "../api/newsApi";
import {_identify} from "../api/userApi";
import FilterBar from './FilterBar';
export default class News extends Component{
    constructor(){
        super();
        this.state={news:[],
            columns1: [
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

            columns2: [
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
                },

                {
                    label: "Operation",

                        render: function(){
                    return (
                        <span>
             <Button plain={true} type="info" size="small">编辑</Button>
             <Button type="danger" size="small">删除</Button>
            </span>
                    )
                }
                }

            ],
            editState:false,
            total:0,
            form:{},
            log_in:false

        };
    }

    handleSwitch=(value)=>{
        this.state.editState=value;
        this.setState({editState:this.state.editState});
        console.log(this.state.editState);
        //console.log(value);
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
    async identify(){
        const res=await _identify();
        if(res.data.code==200){
            this.setState({log_in: true});
            console.log(this.state.log_in);

        }else{
            this.setState({log_in:false});
            console.log(this.state.log_in);
        }
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
        if(res.data.code==200) {
            let news = res.data.data;
            news.map(item => {
                let thedate = new Date(item.create_time * 1000);
                item.date = thedate.getFullYear() + '/' + parseInt(thedate.getMonth() + 1) + '/' + thedate.getDate();
                item.link = <Link to={"/news/detail/" + item.id}>{item.title}</Link>;
            });
            this.setState({news});
        }else{
            this.setState({news:[]});
            MessageBox.alert( res.data.msg,res.data.title);
        }
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
        this.identify();

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
                <FilterBar handleSearch={this.handleSearch} handleReset={this.handleReset} handleSwitch={this.handleSwitch} editState={this.state.editState} log_in={this.state.log_in} ref="filterbar" />
                <Layout.Row>
                    <Layout.Col span="24" >
                        <Table
                            style={{width:'100%'}}
                            columns={this.state.editState===true?this.state.columns2:this.state.columns1}
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