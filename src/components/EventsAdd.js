import React,{Component} from 'react';
import {Form,Input,Button,Layout, DatePicker} from 'element-react';
import GalleryAdd from "./GalleryAdd";
import FilesAdd from "./FilesAdd";
import { EditorState ,convertToRaw} from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import MyEditor from './MyEditor';
import {_addNews} from "../api/newsApi";
import qs from 'qs';
import HeadBar from "./HeadBar";

export default class NewsAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                contents: '',
                pics:[],
                author: '',
                e_startDate:'',
                e_endDate:''
            },
            picAdd:false,
            fileAdd:false
        };
    }


    async addNews(data){
        const res=await _addNews(qs.stringify(data));
        if(res.data.code==200){
            //sessionStorage.setItem('login','true');
            this.props.history.push('/news');
        }
    }
    componentWillMount(){
        // let author=JSON.parse(localStorage.getItem('login')).name;
        // this.state.form.author=author;
        // this.setState(this.state);

    }
    onSubmit(e) {
        e.preventDefault();
        let {title}=this.state.form;
        // let contents=draftjs(convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent()));
        let contents=convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent());
        let pics=this.refs.gallery?this.refs.gallery.state.fileList:[];
        let files=this.refs.fileslib?this.refs.fileslib.state.fileList:[];
        let data={'title':title, 'contents': JSON.stringify(contents),'pics':pics,'files':files};
        this.addNews(data);
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
        this.setState({form:{title:'',contents:'',pics:[]},picAdd:false,fileAdd:false});

    }

    addFile(){

        this.setState({fileAdd:true});
    }

    addPic(){
        this.setState({picAdd:true});
    }

    render(){
        const {e_startDate, e_endDate}=this.state.form;
        return (
            <div>
                <HeadBar/>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Add Event </h2>
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
                    <MyEditor ref='myeditor'/>
                </Form.Item>
                <Form.Item>
                <Layout.Col span="12" >
                    <DatePicker
                        value={e_startDate}
                        placeholder="Start Date"
                        onChange={date=>{
                            this.state.form.e_startDate=date;
                            this.setState({form:this.state.form});
                        }}
                    />
                </Layout.Col>
                <Layout.Col span="12" >
                    <DatePicker
                        value={e_endDate}
                        placeholder="End Date"
                        onChange={date=>{
                            this.state.form.e_endDate=date;
                            this.setState({form:this.state.form});
                        }}
                    />
                </Layout.Col>
                </Form.Item>
                <Form.Item>
                    <Button type="primary"  onClick={this.addResume.bind(this)}>Add Resume <i className="el-icon-upload el-icon-right"></i></Button>
                </Form.Item>
                {/*<Form.Item>*/}
                    {/*{this.state.picAdd == true &&*/}
                    {/*<GalleryAdd ref='gallery' oldpics={[]}/>*/}
                    {/*}*/}
                {/*</Form.Item>*/}
                {/*<Form.Item>*/}
                    {/*{this.state.fileAdd == true &&*/}
                    {/*<FilesAdd ref='fileslib' oldfiles={[]}/>*/}
                    {/*}*/}
                {/*</Form.Item>*/}


            </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )

    }

}