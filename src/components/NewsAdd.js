import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';
export default class NewsAdd extends Component{
    constructor(props) {
        super(props);

        this.state = {
            form: {
                title: '',
                contents: ''
            }
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let title=this.state.form.title;
        let contents=this.state.form.contents;
        let newsStr=localStorage.getItem('news');
        let news=newsStr?JSON.parse(newsStr):[];
        news.push({id:Date.now(),title, contents});
        localStorage.setItem('news',JSON.stringify(news));
        this.props.history.push('/news');
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    handleSubmit=()=>{
        let title=this.title.value;
        let contents=this.contents.value;
        let newsStr=localStorage.getItem('news');
        let news=newsStr?JSON.parse(newsStr):[];
        news.push({id:Date.now(),title, contents});
        localStorage.setItem('news',JSON.stringify(news));
        this.props.history.push('/blog/news');
        //this.props.history.goBack();
    }

    handleReset(e) {

        e.preventDefault();
        // if(this.refs.form)
        //     console.log(this.refs.form);
        this.refs.form.resetFields();
        this.setState({form:{title:'',contents:''}});

    }
    render(){
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Add Document </h2>
            <Form model={this.state.form} ref='form' labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item label="Title">
                    <Input value={this.state.form.title}  placeholder='Add Title Here' onChange={this.onChange.bind(this, 'title')}></Input>
                </Form.Item>

                <Form.Item label="Contents">
                    <Input type="textarea" value={this.state.form.contents}  autosize={{ minRows: 6, maxRows: 10} }placeholder="Add Contents Here" onChange={this.onChange.bind(this, 'contents')}></Input>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" nativeType="submit">Add</Button>
                    <Button onClick={this.handleReset.bind(this)}>Cancel</Button>
                </Form.Item>
            </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )

    }

}