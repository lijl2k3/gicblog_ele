import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Table, Layout,Breadcrumb,MessageBox,Button} from 'element-react';
import BreadcumbBar from './BreadcumbBar';
import PageBar from './PageBar';
import {_newsList,_total,_delete} from "../api/newsApi";
import {_identify} from "../api/userApi";
import FilterBar from './FilterBar';
import qs from 'qs';
import HeadBar from "./HeadBar";
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
                        render: (row,column,index)=>{
                    return (
                        <span>
             <Button plain={true} type="info" size="small" onClick={this.editRow.bind(this,row)}>Edit</Button>
             <Button type="danger" size="small" onClick={this.deleteRow.bind(this,row)}>Delete</Button>
            </span>
                    )
                }
                }

            ],
            editState:sessionStorage.getItem('editState')?sessionStorage.getItem('editState'):false,
            total:0,
            form:{},
            log_in:false,
            cur:1,
            psize:5

        };
    }

    handleSwitch=(value)=>{
        this.state.editState=(value==true)?1:0;
        this.setState({editState:this.state.editState});
        sessionStorage.setItem('editState',this.state.editState);
        this.refs.pagebar.state.cur=1;
        this.refs.pagebar.setState({cur:this.refs.pagebar.state.cur});
        this.newsList();
        this.newsTotal();

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

        }else{
            this.setState({log_in:false});
        }
    }

    async deleteNews(data,index){
        const res=await _delete(qs.stringify(data));
        if(res.data.code==200){
           this.newsTotal();
           this.newsList();
        }
    }



    async newsList(){
        let cur=this.refs.pagebar.state.cur;
        let psize=this.refs.pagebar.state.psize;
        let data={
            start:(cur-1)*psize,
            count:psize,
            my:this.state.editState
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
                //item.link = <Link to={"/news/detail/" + item.id}>{item.title}</Link>;
                item.link = <a className='link' onClick={this.detailRow.bind(this, item.id)}>{item.title}</a>;
            });
            this.setState({news});

        }else{
            this.setState({news:[]});
            MessageBox.alert( res.data.msg,res.data.title);
        }
    }

    async newsTotal(){
        let data={my:this.state.editState};
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

        // if(this.props.location.state && this.props.location.state.cur){
        //     this.refs.pagebar.state.cur=this.props.location.state.cur;
        //     this.forceUpdate();
        // }
        // if(this.props.location.state && this.props.location.state.psize){
        //     this.refs.pagebar.state.psize=this.props.location.state.psize;
        //     this.forceUpdate();
        // }


        // let news=newsStr?JSON.parse(newsStr):[];
        // news.map(item=>{
        //     let thedate=new Date(item.date);
        //     item.date=thedate.getFullYear()+'/'+thedate.getMonth()+1+'/'+thedate.getDate();
        //     item.link=<Link to={"/news/detail/"+item.id}>{item.title}</Link>;
        // });
        // this.setState({news});

    }

    deleteRow(row,col,index){
        let data={id:row.id};
        this.deleteNews(data,index);
    }

    editRow(row){
        this.props.history.push({pathname:'/news/edit', state:{id:row.id, psize:this.refs.pagebar.state.psize,cur:this.refs.pagebar.state.cur}});
    }

    detailRow(id){
        //console.log(id);
        this.props.history.push({pathname:'/news/detail/'+id, state:{ psize:this.refs.pagebar.state.psize,cur:this.refs.pagebar.state.cur}});
    }

    componentWillMount(){
        if(this.props.location.state!==undefined) {
            let {cur, psize} = this.props.location.state;
            if(cur && psize) {
                this.setState({cur: cur, psize: psize});
            }
        }

        else{
            this.setState({cur:1,psize:5});
        }
    }




    render(){
        console.log(this.state);
        return (
            <div className="row">
                <HeadBar/>
                <BreadcumbBar nav_arr={[{txt: 'News',to:'/news'},{txt:'List'}]} back={false} />
                <FilterBar handleSearch={this.handleSearch} handleReset={this.handleReset} handleSwitch={this.handleSwitch} editState={this.state.editState} log_in={this.state.log_in} ref="filterbar" />
                <Layout.Row>
                    <Layout.Col span="24" >
                        <Table
                            style={{width:'100%'}}
                            columns={this.state.editState==1?this.state.columns2:this.state.columns1}
                            data={this.state.news}
                        />
                        <div style={{'float':'right'}}>
                            <PageBar ref='pagebar' handleList={this.newsList.bind(this)} total={this.state.total}  cur={this.state.cur} psize={this.state.psize} />
                        </div>
                    </Layout.Col>

                </Layout.Row>

            </div>
        )
    }

}