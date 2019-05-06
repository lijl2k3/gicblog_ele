import React,{Component} from 'react';
import {Layout,Button,Tabs}from 'element-react';
import 'element-theme-default';
import BreadcumbBar from './BreadcumbBar';
import Schedule from './Schedule';
import { EditorState ,convertFromRaw} from 'draft-js';
import draftjs from 'draftjs-to-html';
import {_details} from "../api/eventsApi";
import qs from 'qs';
import HeadBar from "./HeadBar";
import Resume from './Resume';
export default class EventsDetail extends Component{

    constructor(){
        super();
        this.state={info:{},attendees:[],schedules:[]
        };
    }

    async details(data){
        const res=await _details(data);

        if(res.data.code==200){

            let info=res.data.data;
            let attendees,schedules;
            if(info.attendees){
               attendees=JSON.parse(info.attendees);
                this.setState({attendees});
            }
            if(info.schedules){
                schedules=JSON.parse(info.schedules);
                this.setState({schedules});
            }
            // if(info.schedules){
            //     this.state.schedules=JSON.parse(info.schedules);
            //     console.log(this.state.schedules);
            // }
            this.setState({info});

        }
    }

    componentWillMount(){
        let id=this.props.match.params.id;
        let data={id:id};
        this.details(data);
    }

    handleBack=()=>{
        this.props.history.push({pathname:'/events', state:{psize:this.props.history.location.state.psize,cur:this.props.history.location.state.cur}});
    }

    render(){
        console.log(this.state.schedules);
        let item=this.state.info;
        let contents=(item.contents);
        let startDate=new Date(this.state.info.start_date*1000);
        let endDate=new Date(this.state.info.end_date*1000);
       if(contents!==undefined){
          contents=JSON.parse(contents);
       }
        return (
            <div>
                <HeadBar/>
                <BreadcumbBar nav_arr={[{txt: 'Events',to:'/events'},{txt:'Details'}]} back={true} handleBack={this.handleBack} />

                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> {item.title} </h2>
                    </Layout.Col>
                    <Layout.Col span="12" offset="4">
                       <div dangerouslySetInnerHTML={ {__html:draftjs(contents)} }></div>
                </Layout.Col>
                    <Layout.Col span="12" offset="4">
                        <span><b>Time: </b>{startDate.getFullYear() + '/' + parseInt(startDate.getMonth() + 1) + '/' + startDate.getDate()} - {endDate.getFullYear() + '/' + parseInt(endDate.getMonth() + 1) + '/' + endDate.getDate()}</span>
                    </Layout.Col>

                </Layout.Row>


                {(this.state.attendees.length>0) &&
                    (<Layout.Row>
                        <Layout.Col span="16" offset="4">
                            <h2>Attendees:</h2>

                            {this.state.attendees.map((item,key)=>{
                                    return(
                                        <Layout.Row key={key} style={{borderBottom:'solid 1px #bfcbd9',marginTop:'20px'}}>
                                        <Resume item={item} mode={'view'} path={this.state.info.pic_path}/>
                                        </Layout.Row>
                                    )
                                }
                            ) }

                        </Layout.Col>
                    </Layout.Row>) }

                {/*{this.state.schedules.length>0 &&*/}
                {/*<div></div>*/}
                {/*}*/}

                {this.state.schedules.length>0 &&
                <Layout.Row style={{marginBottom:'60px'}}>
                    <Layout.Col span={12} offset={4}>
                    <h2>{this.state.schedules.length} Schedule(s) added:</h2>
                        <Tabs type="card" value="tab0">
                        {this.state.schedules.map((item,key)=>{
                            return(
                                <Tabs.Pane label={(new Date(item.date)).toLocaleDateString()} name={'tab'+key} key={key}>
                                    <Schedule mode={'paneview'} item={item}/>
                                </Tabs.Pane>
                            )
                        })}
                        </Tabs>
                        </Layout.Col>
                    </Layout.Row>

                }


                    {/*<div>*/}
                        {/*{item.attendees!=undefined & (item.attendees.length>0)&&*/}
                        {/*(<h2>Attendees</h2>)*/}
                        {/*}*/}
                    {/*</div>*/}

            </div>

        )


    }

}