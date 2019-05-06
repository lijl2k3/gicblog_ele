import React,{Component} from 'react';
import {Upload,Button,Layout, Alert, Message, Input, Popover} from 'element-react';
export default class ResumeAdd extends Component{
    constructor(props) {
        super(props);
        this.state={
            imageUrl:'',
            pic:{},
            intro:'',
            name:'',
        }

    }
    handleAvatarScucess(res, file) {
        this.setState({ imageUrl: URL.createObjectURL(file.raw) });
        this.setState({pic:res.data});

    }
    handleIntro=(value)=> {
        this.setState({intro:value});

    }
    handleName=(value)=> {
        this.setState({name:value});
        
    }
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            Message('Avator must be jpeg format!');
        }
        if (!isLt2M) {
            Message('Avator size must not larger than 2MB!');
        }
        return isJPG && isLt2M;
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
        const { imageUrl } = this.state;
        switch(this.props.mode) {
            case 'add':
            return(
                    <div className='box'>
                        <Layout.Row>
                            <Layout.Col span="24">
                                <h2> Add Attendee Here </h2>
                                <Upload
                                    className="avatar-uploader"
                                    action="http://gicapi.io/index.php/index/index/uploadPics"
                                    withCredentials={true}
                                    showFileList={false}
                                    onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
                                    beforeUpload={file => this.beforeAvatarUpload(file)}
                                >
                                    <span> <b>Avatar:&nbsp;&nbsp;&nbsp;</b></span>{imageUrl ?
                                    <img src={imageUrl} className="avatar"/> :
                                    <i className="el-icon-plus avatar-uploader-icon"></i>}
                                </Upload>
                                <h3>Name</h3>
                                <Input placeholder="Attendee's name" onChange={this.handleName} value={this.state.name} />
                                <h3>Intro</h3>
                                <Input
                                    type="textarea"
                                    autosize={{ minRows: 2, maxRows: 4}}
                                    placeholder="Introduction"
                                    onChange={this.handleIntro}
                                />
                                <Button style={{float: 'right', marginTop: '20px'}}
                                        onChange={this.handleIntro.bind(this)} size="small" type="success"
                                        onClick={this.props.submitIntro}>Upload</Button>
                            </Layout.Col>
                        </Layout.Row>

                    </div>
                );
            break;

            case 'viewpop': {
                let item = this.props.item;
                let imgsrc = "http://localhost/gicapi/public/static/attendees/avatar_noname.png";
                if (Object.keys(item.pic).length > 0) {
                    imgsrc = "http://localhost/gicapi/public/thumbnail/" + item.pic.path + '/' + item.pic.name;
                }
                return (

                    <Layout.Col span="4" style={{'marginBottom': '30px', 'marginRight': '20px'}}>
                        <div style={{width: '120px'}}
                             style={{'border': 'solid #333 1px', 'padding': '20px', position: 'relative'}}>
                            <img style={{'width': '95%'}} src={imgsrc}/>
                            <Popover placement="top-start" title={item.name} width="400" trigger="click"
                                     content={item.intro}>
                                <Button style={{width: '95%'}}>More</Button>
                            </Popover>
                            <div className='close' onClick={this.props.handleClose}></div>
                        </div>

                    </Layout.Col>

                );
                break;

            }

            case 'view': {
                let item = this.props.item;
                let imgsrc = "http://localhost/gicapi/public/static/attendees/avatar_noname.png";
                if (Object.keys(item.pic).length > 0) {
                    imgsrc = "http://localhost/gicapi/public/static/attendees/" + this.props.path + '/thumb/' + item.pic.name;
                }
                return (

                    <Layout.Col span="24" >
                        <Layout.Col span={4}>

                        <div className='avatordiv'><img src={imgsrc} /></div>
                        </Layout.Col>
                        <Layout.Col span={13}>
                            <h4 style={{marginTop:0}}>{item.name}</h4>
                            <div style={{wordWrap:'break-word',marginBottom:'20px'}}>{item.intro}</div>
                        </Layout.Col>
                    </Layout.Col>

                );
                break;

            }
            }
        }

    }
