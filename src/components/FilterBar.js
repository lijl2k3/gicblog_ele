import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';
export default class FilterBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                contents: '',
                author: ''
            }
        };
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render(){
        return (
                <Layout.Row >
                <Layout.Col span="18" offset="3" className={"searchbar"}>

                    <Layout.Col span="3" >
                        <Input placeholder="title" onChange={this.onChange.bind(this,'title')}/>
                    </Layout.Col>
                    <Layout.Col span="6" style={{"margin-left":"10px"}}>
                        <Input placeholder="contents" onChange={this.onChange.bind(this,'contents')}/>
                    </Layout.Col>
                    <Layout.Col span="3" style={{"margin-left":"10px"}}>
                        <Input placeholder="author" onChange={this.onChange.bind(this,'author')} />
                    </Layout.Col>
                    <Layout.Col span="3" style={{"margin-left":"10px"}}>
                        <Button type="primary" icon="search" onClick={this.props.handleSearch.bind(this,this.state.form)}>Search</Button>
                    </Layout.Col>

                </Layout.Col>
            </Layout.Row>
        )
    }

}