import React,{Component} from 'react';
import {Layout}from 'element-react';
import 'element-theme-default';
import BreadcumbBar from './BreadcumbBar';
import { EditorState ,convertFromRaw} from 'draft-js';
import draftjs from 'draftjs-to-html';
import {_details} from "../api/newsApi";
import qs from 'qs';
export default class NewsDetail extends Component{

    constructor(){
        super();
        this.state={info:{},
        };
    }

    async details(data){
        const res=await _details(data);

        if(res.data.code==200){
            let info=res.data.data;
            this.setState({info});
        }
    }

    componentWillMount(){
        let id=this.props.match.params.id;
        let data={id:id};
        this.details(data);
    }

    handleBack=()=>{
        this.props.history.goBack();
    }

    render(){

        let item=this.state.info;
        let contents=(item.contents);
       if(contents!==undefined){
          contents=JSON.parse(contents);
       }
        return (
            <div>
                <BreadcumbBar nav_arr={[{txt: 'News',to:'/news'},{txt:'Details'}]} back={true} handleBack={this.handleBack} />
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> {item.title} </h2>
                    </Layout.Col>
                    <Layout.Col span="12" offset="4">
                       <div dangerouslySetInnerHTML={ {__html:draftjs(contents)} }></div>
                </Layout.Col>
                </Layout.Row>
                {/*{item.pics!=undefined & (item.pics.length>0)&&*/}
                {/*(<div>aa</div>)*/}
                {/*}*/}

                {(item.pics!==undefined) &&
                    (<Layout.Row>
                        <Layout.Col span="12" offset="4">
                            <h2>Related Pictures:</h2>
                            <Layout.Row>
                            {item.pics.map((pic,key)=>{
                                    return(
                                        <Layout.Col span="4" style={{'marginBottom':'30px','marginRight':'20px'}} key={key}>
                                            <div  style={{width:'120px'}} style={{'border': 'solid #333 1px','padding':'20px'}}><a target='_blank' href={"http://localhost/gicapi/public/static/images/"+item.pic_path+'/'+pic} rel="noopener noreferrer"><img style={{'width':'95%'}} src={"http://localhost/gicapi/public/static/images/"+item.pic_path+'/thumb/'+pic} /></a> </div>
                                        </Layout.Col>
                                    )
                                }
                            ) }
                            </Layout.Row>
                        </Layout.Col>
                    </Layout.Row>) }
            </div>

        )


    }

}