import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';
import GalleryAdd from "./GalleryAdd";
import FilesAdd from "./FilesAdd";
import { EditorState ,convertToRaw, convertFromRaw} from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import MyEditor from './MyEditor';
import BreadcumbBar from './BreadcumbBar';
import {_details, _editNews} from "../api/newsApi";
import qs from 'qs';
import HeadBar from "./HeadBar";


export default class NewsEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                contents: '',

                author: ''
            },
            pics:[],
            picAdd:true,
            fileAdd:true,
            pic_path:''
        };
    }


    async editNews(data){
        const res=await _editNews(qs.stringify(data));
        if(res.data.code==200){
            //sessionStorage.setItem('login','true');
            this.handleBack();
        }
    }

    async getNews(data){
        const res=await _details(data);
        if(res.data.code==200){
            console.log(this.refs);
            this.state.form.contents = res.data.data.contents;
                this.state.form.title = res.data.data.title;
                this.state.form.author=res.data.data.author;
                let editContents=EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.data.contents)));
                this.setState({form:this.state.form});
                this.refs.myeditor.setState({editorState:editContents});
                if(res.data.data.pics!==undefined && res.data.data.pics.length>0){
                    this.setState({pics:res.data.data.pics, pic_path:res.data.data.pic_path});
                    this.refs.gallery.setState({oldpics:res.data.data.pics});
                }
                if(res.data.data.files!==undefined && res.data.data.files.length>0){
                    this.setState({files:res.data.data.files, file_path:res.data.data.file_path});
                    this.refs.fileslib.setState({oldfiles:res.data.data.files});
                }
        }

    }
    componentWillMount(){
        let id=this.props.history.location.state.id;
        let data={id:id,my:1};
        this.getNews(data);
        //console.log( this.state.form.contents);
    }
    onSubmit(e) {
        e.preventDefault();
        let {title}=this.state.form;
        // let contents=draftjs(convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent()));
        let contents=convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent());
        let pics=this.refs.gallery?this.refs.gallery.state.fileList:[];
        let hidePics=this.refs.gallery?this.refs.gallery.state.hidePics:[];
        let files=this.refs.fileslib?this.refs.fileslib.state.fileList:[];
        let hideFiles=this.refs.fileslib?this.refs.fileslib.state.hideFiles:[];
        let data={'title':title, 'contents': JSON.stringify(contents),'pics':pics,'hidePics':hidePics,'files':files,'hideFiles':hideFiles,'id':this.props.history.location.state.id};
        this.editNews(data);
        // let newsStr=localStorage.getItem('news');
        // let news=newsStr?JSON.parse(newsStr):[];
        // news.push({id:Date.now(),title, contents,author,pics, date:Date.now()});
        // localStorage.setItem('news',JSON.stringify(news));
        //this.props.history.push('/news');
        //console.log(this.props);
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    changeText(){
       this.state.form.contents=this.refs.myeditor.state.editorState;
        this.setState({form:this.state.form});
    }

    handleBack=()=>{
        this.props.history.push({pathname:'/news', state:{psize:this.props.history.location.state.psize,cur:this.props.history.location.state.cur}});
    }


    // handleSubmit=()=>{
    //     let title=this.title.value;
    //     let contents=this.contents.value;
    //     let newsStr=localStorage.getItem('news');
    //     let news=newsStr?JSON.parse(newsStr):[];
    //     news.push({id:Date.now(),title, contents});
    //     localStorage.setItem('news',JSON.stringify(news));
    //     this.props.history.push('/blog/news');
    //     //this.props.history.goBack();
    // }

    handleReset(e) {

        e.preventDefault();
        // if(this.refs.form)
        //     console.log(this.refs.form);
        this.refs.form.resetFields();
        this.setState({form:{title:'',contents:'',pics:[]},picAdd:false});

    }

    addFile(){
        this.setState({fileAdd:true});
    }

    addPic(){
        this.setState({picAdd:true});
    }

    render(){


        return (
            <div className="row">
                <HeadBar/>
                <BreadcumbBar nav_arr={[ {txt:'News',to:'/news'},{txt:'Edit'}]} back={true} handleBack={this.handleBack} />
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Edit Document </h2>
            <Form model={this.state.form} ref='form' labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item>
                <div style={{'float':'right'}}>
                    <Button type="success" nativeType="submit">Save</Button>
                    <Button onClick={this.handleReset.bind(this)}>Cancel</Button>
                </div>
                </Form.Item>
                <Form.Item label="Title">
                    <Input value={this.state.form.title}  placeholder='Add Title Here' onChange={this.onChange.bind(this, 'title')}></Input>
                </Form.Item>
                <Form.Item>
                    <MyEditor ref='myeditor'  />
                </Form.Item>
                <Form.Item>
                    <Button type="primary"  onClick={this.addPic.bind(this)}>Add Pictures <i className="el-icon-upload el-icon-right"></i></Button>
                    <Button type="primary"  onClick={this.addFile.bind(this)}>Add Files <i className="el-icon-upload el-icon-right"></i></Button>
                </Form.Item>
                <Form.Item>
                    {this.state.picAdd == true &&
                    <GalleryAdd ref='gallery'  pic_path={this.state.pic_path}/>
                    }
                </Form.Item>

                <Form.Item>
                    {this.state.fileAdd == true &&
                    <FilesAdd ref='fileslib'  file_path={this.state.file_path}/>
                    }
                </Form.Item>


            </Form>
                    </Layout.Col>
                </Layout.Row>


            </div>
        )

    }

}