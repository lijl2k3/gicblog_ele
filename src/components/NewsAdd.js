import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';
import GalleryAdd from "./GalleryAdd";
import { EditorState ,convertToRaw} from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import MyEditor from './MyEditor';
export default class NewsAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                contents: '',
                pics:[],
                author: ''
            },
            picAdd:false,
        };
    }
    componentWillMount(){
        let author=JSON.parse(localStorage.getItem('login')).name;
        this.state.form.author=author;
        this.setState(this.state);
    }
    onSubmit(e) {
        e.preventDefault();
        let {title,author}=this.state.form;
        // let contents=draftjs(convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent()));
        let contents=convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent());
        let pics=this.refs.gallery?this.refs.gallery.state.fileList:[];
        let newsStr=localStorage.getItem('news');
        let news=newsStr?JSON.parse(newsStr):[];
        news.push({id:Date.now(),title, contents,author,pics, date:Date.now()});
        localStorage.setItem('news',JSON.stringify(news));
        this.props.history.push('/news');
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
        this.setState({form:{title:'',contents:'',pics:[]},picAdd:false});

    }

    addFile(){

        console.log(this.refs.gallery);
    }

    addPic(){
        this.setState({picAdd:true});
    }

    render(){
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Add Document </h2>
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
                    <Button type="primary"  onClick={this.addPic.bind(this)}>Add Pictures <i className="el-icon-upload el-icon-right"></i></Button>
                    <Button type="primary"  onClick={this.addFile.bind(this)}>Add Files <i className="el-icon-upload el-icon-right"></i></Button>
                </Form.Item>
                <Form.Item>
                    {this.state.picAdd == true &&
                    <GalleryAdd ref='gallery'/>
                    }
                </Form.Item>


            </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )

    }

}