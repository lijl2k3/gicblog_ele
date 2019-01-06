import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';
import GalleryAdd from "./GalleryAdd";
export default class NewsAdd extends Component{
    constructor(props) {
        super(props);

        this.state = {
            form: {
                title: '',
                contents: '',
                pics:[]
            },
            picAdd:false,
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let title=this.state.form.title;
        let contents=this.state.form.contents;
        let pics=this.refs.gallery.state.fileList;
        let newsStr=localStorage.getItem('news');
        let news=newsStr?JSON.parse(newsStr):[];
        news.push({id:Date.now(),title, contents,pics});
        localStorage.setItem('news',JSON.stringify(news));
        this.props.history.push('/news');
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
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

                <Form.Item label="Contents">
                    <Input type="textarea" value={this.state.form.contents}  autosize={{ minRows: 6, maxRows: 10} }placeholder="Add Contents Here" onChange={this.onChange.bind(this, 'contents')}></Input>
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