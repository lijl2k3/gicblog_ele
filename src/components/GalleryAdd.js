import React,{Component} from 'react';
import {Upload,Button,Layout, Alert} from 'element-react';
export default class GalleryAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            fileList:[],
            errMsg:[],
            oldpics:[],
            hidePics:[]
        }

    }
    handleSuccess(response,file,fileList){
        if(response.code==200) {
            console.log(response.data.data);
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

    handleHide=(item,key)=>{
        let pics=this.state.oldpics.filter((item,index)=>{
            return index!==key;
        });
        this.state.hidePics.push(item);
        this.setState({oldpics:pics,hidePics:this.state.hidePics});
        //console.log(this.state);
    }

    checkFileType(file){
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;
        let errtxt='';
        if (!isJPG && !isGIF && !isPNG && !isBMP) {
             errtxt=(' file must be JPG/GIF/PNG/BMP format!');
        }
        if (!isLt2M) {
             errtxt=(' file size exceeds 2MB!');
        }
        if(errtxt!==''){
            let errors=this.state.errMsg;
            errors.push(errtxt);
            this.setState({errMsg:errors});
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
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
                action={"http://gicapi.io/index.php/index/index/uploadPics"}
                withCredentials={true}
                // action="//jsonplaceholder.typicode.com/posts/"
                //onPreview={file => this.handlePreview(file)}
                //onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                onSuccess={(response,file,fileList)=>this.handleSuccess(response,file,fileList)}
                accept='image/jpeg,image/gif, image/png,image/jpg'
                fileList={this.fileList}
                autoUpload={false}
                tip={<div className="el-upload__tip">Allowed file type: jpg/jpeg/gif/png</div>}
                trigger={<Button size="small" type="primary">Choose File</Button>}
                beforeUpload={(file)=>this.checkFileType(file)}

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

                {this.state.oldpics.length>0 &&
                (<Layout.Row>
                    <Layout.Col span="24">
                        <h2>{this.state.oldpics.length} Existing Pictures:</h2>
                        <Layout.Row>
                            {this.state.oldpics.map((item,key)=>{
                                    return(
                                        <Layout.Col span="4" style={{'marginBottom':'30px','marginRight':'20px'}} key={key}>
                                            <div  style={{width:'120px'}} style={{'border': 'solid #333 1px','padding':'20px',position:'relative'}}><a target='_blank' href={"http://localhost/gicapi/public/static/images/"+this.props.pic_path+'/'+item}><img style={{'width':'95%'}} src={"http://localhost/gicapi/public/static/images/"+this.props.pic_path+'/'+item} /></a> <div className='close' onClick={this.handleHide.bind(this,item,key)} ></div></div>

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