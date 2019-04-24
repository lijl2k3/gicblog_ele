import React,{Component} from 'react';
import {Button,Layout, Alert, Message, Input,DatePicker,Form, Icon} from 'element-react';
import Todos from "./Todos";
export default class Schedule extends Component{

    constructor(props) {
        super(props)
        this.state = {TodoAdd:false, todos:[]}
        this.submitTodo=this.submitTodo.bind(this);
    }


    addTodo(){
        this.setState({TodoAdd:true});
    }

    submitTodo(){
        this.state.todos.push(this.refs.todo.state);
        this.setState({todos:this.state.todos, TodoAdd:false});
    }

    render() {
        const {value1} = this.state

        return (
                <div className="block">
                    <Layout.Row>
                        <Layout.Col span={12}>
                    <DatePicker
                        value={value1}
                        placeholder="Choose Date"
                        onChange={date=>{
                            this.setState({value1: date})
                        }}
                    />
                        </Layout.Col>
                        <Layout.Col span={4}>
                    <Button  type="text" onClick={this.addTodo.bind(this)}>Add Plan<i className="el-icon-plus el-icon-right"></i></Button>
                        </Layout.Col>
                    </Layout.Row>
                    {this.state.todos.length>0 &&
                    this.state.todos.map((item,key)=>{
                        let startMin=item.startDate.getMinutes()<=9?'0'+item.startDate.getMinutes().toString():item.startDate.getMinutes().toString();
                        let endMin=item.endDate.getMinutes()<=9?'0'+item.endDate.getMinutes().toString():item.endDate.getMinutes().toString();
                        return(
                        <Layout.Row gutter={60} style={{marginTop:'20px'}} key={key}>
                            <Layout.Col span={8}>{item.startDate.getHours()+':'+startMin+' - '+item.endDate.getHours()+':'+endMin}</Layout.Col>
                            <Layout.Col span={10}>{item.plan}</Layout.Col>
                        </Layout.Row>)
                    })
                    }
                    {this.state.TodoAdd == true &&
                        <Form>
                        <Form.Item>
                    <Todos ref='todo' submitTodo={this.submitTodo}/>
                        </Form.Item>
                        </Form>
                    }
                </div>




                )
    }



}