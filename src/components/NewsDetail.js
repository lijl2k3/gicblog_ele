import React,{Component} from 'react';
import {Layout}from 'element-react';
import 'element-theme-default';
import { EditorState ,convertFromRaw} from 'draft-js';
import draftjs from 'draftjs-to-html';
export default class NewsDetail extends Component{
    render(){
        let id=this.props.match.params.id;
        let news=JSON.parse(localStorage.getItem('news'));
        let item=news.find(item=>item.id==id);
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> {item.title} </h2>
                    </Layout.Col>
                    <Layout.Col span="12" offset="4">
                       <div dangerouslySetInnerHTML={ {__html:draftjs(item.contents)} }></div>
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
                            {item.pics.map((item,key)=>{
                                    return(
                                        <Layout.Col span="4" style={{'marginBottom':'30px','marginRight':'20px'}} key={key}>
                                            <div  style={{width:'120px'}} style={{'border': 'solid #333 1px','padding':'20px'}}><a target='_blank' href={"http://localhost/gicapi/public/uploads/"+item} rel="noopener noreferrer"><img style={{'width':'95%'}} src={"http://localhost/gicapi/public/thumbnail/"+item} /></a> </div>
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