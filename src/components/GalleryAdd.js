import React,{Component} from 'react';
import {Upload,Button,Layout, Alert} from 'element-react';
export default class GalleryAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            fileList:[],
            errMsg:[],
        }

    }
    handleSuccess(response,file,fileList){
        if(response.code==200) {
            let list = this.state.fileList;
            list.push(response.data);
            this.setState({fileList: list});

        }else{
            file.status='failure';
            let errors=this.state.errMsg;
            console.log(response);
            errors.push(response.msg);
            this.setState({errMsg:errors});
        }

    }

    handleClose=key=>{
        let pics=this.state.fileList.filter((item,index)=>{
            return index!==key;
        });
        this.setState({fileList:pics});

    }

    render() {
        return (
            <div className='box'>
                <Layout.Row>
                    <Layout.Col span="24">
                        <h2> Add Pictures Here </h2>
            <Upload
                className="upload-demo"
                ref="upload"
                action={"http://gicapi.io/index.php/index/index/upload"}
                withCredentials={true}
                // action="//jsonplaceholder.typicode.com/posts/"
                //onPreview={file => this.handlePreview(file)}
                //onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                onSuccess={(response,file,fileList)=>this.handleSuccess(response,file,fileList)}
                accept='image/jpeg'
                fileList={this.fileList}
                autoUpload={false}
                tip={<div className="el-upload__tip">jpg/png/gif</div>}
                trigger={<Button size="small" type="primary">Choose File</Button>}
            >
                <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.submitUpload()}>Upload</Button>
            </Upload>
                    </Layout.Col>
                </Layout.Row>
                {this.state.errMsg.length>0 &&
                (<Layout.Row>
                    <Layout.Col span="24">
                        {this.state.errMsg.map((item,key)=>{
                                return(
                                    <div key={key} ><Alert type="error" title={"fail to upload this file:"+item} /></div>
                                )
                            }

                        ) }
                    </Layout.Col>
                </Layout.Row>) }

                {this.props.oldpics.length>0 &&
                (<Layout.Row>
                    <Layout.Col span="24">
                        <h2>{this.props.oldpics.length} Existing Pictures:</h2>
                        <Layout.Row>
                            {this.props.oldpics.map((item,key)=>{
                                    return(
                                        <Layout.Col span="4" style={{'marginBottom':'30px','marginRight':'20px'}} key={key}>
                                            <div  style={{width:'120px'}} style={{'border': 'solid #333 1px','padding':'20px'}}><a target='_blank' href={"http://localhost/gicapi/public/static/images/"+this.props.pic_path+'/'+item}><img style={{'width':'95%'}} src={"http://localhost/gicapi/public/static/images/"+this.props.pic_path+'/'+item} /></a> </div>

                                        </Layout.Col>
                                    )
                                }
                            ) }
                        </Layout.Row>
                    </Layout.Col>
                </Layout.Row>) }

                {this.state.fileList.length>0 &&
                    (<Layout.Row>
                        <Layout.Col span="24">
                            <h2>{this.state.fileList.length} Pictures loaded:</h2>
                            <Layout.Row>
                            {this.state.fileList.map((item,key)=>{
                                 return(
                                     <Layout.Col span="4" style={{'marginBottom':'30px','marginRight':'20px'}} key={key}>
                                         <div  style={{width:'120px',}} style={{'border': 'solid #333 1px','padding':'20px',position:'relative'}}><a target='_blank' href={"http://localhost/gicapi/public/uploads/"+item.path+'/'+item.name}><img style={{'width':'95%'}} src={"http://localhost/gicapi/public/thumbnail/"+item.path+'/'+item.name} /></a> <div className='close' onClick={this.handleClose.bind(this,key)} ></div></div>
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

    submitUpload(){
        this.refs.upload.submit();
    }
}