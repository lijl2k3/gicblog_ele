import React,{Component} from 'react';
import {Upload,Button,Layout} from 'element-react';
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
            let errors=this.state.errMsg;
            errors.push(response.msg);
            this.setState({errMsg:errors});
            console.log(this.state.errMsg);
        }
    }

    render() {
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Add Pictures Here </h2>
            <Upload
                className="upload-demo"
                ref="upload"
                action={"http://gicapi.io/index.php/index/index/upload"}
                // action="//jsonplaceholder.typicode.com/posts/"
                //onPreview={file => this.handlePreview(file)}
                //onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                onSuccess={(response,file,fileList)=>this.handleSuccess(response,file,fileList)}
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
                    <Layout.Col span="12" offset="4">
                        {this.state.errMsg.map((item,key)=>{
                                return(
                                    <div key={key}><span>fail to upload this file:{item}</span></div>
                                )
                            }

                        ) }
                    </Layout.Col>
                </Layout.Row>) }
                {this.state.fileList.length>0 &&
                    (<Layout.Row>
                        <Layout.Col span="12" offset="4">
                            <h2>{this.state.fileList.length} Pictures loaded:</h2>
                            {this.state.fileList.map((item,key)=>{
                                 return(
                                    <div key={key} style={{width:'120px'}}><img  style={{width:'100%'}} src={"http://localhost/gicapi/public/thumbnail/"+item} /></div>
                                    )
                                }

                            ) }
                        </Layout.Col>
                    </Layout.Row>) }

            </div>
        )

    }

    submitUpload(){
        this.refs.upload.submit();
    }
}