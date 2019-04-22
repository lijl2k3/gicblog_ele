import React,{Component} from 'react';
import {Layout}from 'element-react';
import 'element-theme-default';
import BreadcumbBar from './BreadcumbBar';
import { EditorState ,convertFromRaw} from 'draft-js';
import draftjs from 'draftjs-to-html';
import {_details} from "../api/eventsApi";
import qs from 'qs';
import HeadBar from "./HeadBar";
export default class EventsDetail extends Component{

    constructor(){
        super();
        this.state={info:{},attendees:[]
        };
    }

    async details(data){
        const res=await _details(data);

        if(res.data.code==200){
            let info=res.data.data;
            let attendees=JSON.parse(info.attendees);
            this.setState({info,attendees});
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
                        <span><b>Time:</b>{startDate.getFullYear() + '/' + parseInt(startDate.getMonth() + 1) + '/' + startDate.getDate()} - {endDate.getFullYear() + '/' + parseInt(endDate.getMonth() + 1) + '/' + endDate.getDate()}</span>
                    </Layout.Col>

                </Layout.Row>


                {(this.state.attendees.length>0) &&
                    (<Layout.Row>
                        <Layout.Col span="12" offset="4">
                            <h2>Attendees:</h2>
                            <Layout.Row>
                            {this.state.attendees.map((item,key)=>{
                                    return(
                                        <div key={key}>
                                        <Layout.Col span="24" >
                                            <div><b>{item.title}</b></div>
                                            <div><img src={"http://localhost/gicapi/public/static/attendees/"+this.state.info.pic_path+'/thumb/'+item.pic.name} style={{float:"left", width:"120px"}} /><span>{item.intro}</span></div>
                                        </Layout.Col>
                                        </div>
                                    )
                                }
                            ) }
                            </Layout.Row>
                        </Layout.Col>
                    </Layout.Row>) }



                    {/*<div>*/}
                        {/*{item.attendees!=undefined & (item.attendees.length>0)&&*/}
                        {/*(<h2>Attendees</h2>)*/}
                        {/*}*/}
                    {/*</div>*/}

            </div>

        )


    }

}