import React,{Component} from 'react';
import {Form,Input,Button,Layout,DatePicker} from 'element-react';
export default class FilterBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                contents: '',
                author: '',
                value1:'',
                value2:''
            }
        };
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render(){
        const {value1,value2}=this.state.form;
        return (
                <Layout.Row >
                <Layout.Col span="24"  className={"searchbar"}>

                    <Layout.Col span="2" >
                        <Input placeholder="title" onChange={this.onChange.bind(this,'title')} value={this.state.form.title}/>
                    </Layout.Col>
                    <Layout.Col span="4" style={{"margin-left":"10px"}}>
                        <Input placeholder="contents" onChange={this.onChange.bind(this,'contents')} value={this.state.form.contents}/>
                    </Layout.Col>
                    <Layout.Col span="2" style={{"margin-left":"10px"}}>
                        <Input placeholder="author" onChange={this.onChange.bind(this,'author')} value={this.state.form.author}/>
                    </Layout.Col>



                    <Layout.Col span="6" style={{"margin-left":"10px"}} >

                        <Layout.Col span={"10"}>
                                <DatePicker
                                    value={value1}
                                    placeholder="Start Date"

                                    onChange={date=>{
                                        console.log('DatePicker1 changed: ', date)
                                        this.setState({value1: date})
                                    }}
                                    //disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                                />
                        </Layout.Col>
                        <Layout.Col span={"10"} style={{"margin-left":"10px"}}>
                                <DatePicker
                                    value={value2}
                                    placeholder="End Date"
                                    onChange={date=>{
                                        console.debug('DatePicker2 changed: ', date)
                                        this.setState({value2: date})
                                    }}
                                    //disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                                />
                        </Layout.Col>



                    </Layout.Col>

                    <Layout.Col span="6" push={"3"}>
                        <div style={{"display":"inline-block", float:"right"}}>
                            <Button type="primary" icon="search" onClick={this.props.handleSearch.bind(this,this.state.form)}>Search</Button>
                            <Button type="primary" icon="close" onClick={this.props.handleReset.bind(this,this.state.form)}>Reset</Button>
                        </div>
                    </Layout.Col>

                </Layout.Col>
            </Layout.Row>
        )
    }

}