import React,{Component} from 'react';
import {Button,Layout, Alert, Message, Input,DatePicker} from 'element-react';
import Todos from "./Todos";
export default class Schedule extends Component{

    constructor(props) {
        super(props)
        this.state = {TodoAdd:false,
            todos:this.props.item?this.props.item.todos:[],
            value1:this.props.item?this.props.item.date:null}
        this.submitTodo=this.submitTodo.bind(this);
    }


    addTodo(){
        this.setState({TodoAdd:true});
    }

    submitTodo(){
        this.state.todos.push(this.refs.todo.state);
        this.setState({todos:this.state.todos,TodoAdd:false});
    }

    deleteTodo=(key)=>{
        this.setState({
            todos:this.state.todos.filter((item,index)=>{
                return index!==key;
            })
        })
    }

    editTodo=(key)=>{
        let {todoMark}=this.state;
        this.setState({todoMark:key});
    }

    modifyTodo=(key)=>{
        this.state.todos[key]=this.refs.edittodo.state;
        this.setState({todos:this.state.todos,todoMark:null});
    }

    cancelTodo=(key)=>{
        this.setState({todoMark:null});
    }


    render() {
        const {value1} = this.state

        return (
            <div>
                {this.props.viewMark == null &&
                <div className="block">
                    <Layout.Row>
                        <Layout.Col span={12}>
                            <DatePicker
                                value={value1}
                                placeholder="Choose Date"
                                onChange={date => {
                                    this.setState({value1: date})
                                }}
                            />
                        </Layout.Col>
                    </Layout.Row>

                    <div className="listblock">
                        {this.state.todos.length > 0 &&

                        this.state.todos.map((item, key) => {
                            let e_startDate, e_endDate;
                            if ((typeof item.startDate) == 'string') {
                                e_startDate = new Date(item.startDate);
                            } else {
                                e_startDate = item.startDate;
                            }
                            if ((typeof item.endDate) == 'string') {
                                e_endDate = new Date(item.endDate);
                            } else {
                                e_endDate = item.endDate;
                            }
                            let startMin = e_startDate.getMinutes() <= 9 ? '0' + e_startDate.getMinutes().toString() : e_startDate.getMinutes().toString();
                            let endMin = e_endDate.getMinutes() <= 9 ? '0' + e_endDate.getMinutes().toString() : e_endDate.getMinutes().toString();
                            return (
                                <div>
                                    {this.state.todoMark !== key &&
                                    <Layout.Row gutter={"60"} style={{
                                        marginTop: '20px',
                                        marginLeft: '0',
                                        marginRight: '0',
                                        borderBottom: 'solid 1px #bfcbd9',
                                        backgroundColor: '#f4e9c1'
                                    }} key={key}>
                                        <Layout.Col
                                            span={6}>{e_startDate.getHours() + ':' + startMin + ' - ' + e_endDate.getHours() + ':' + endMin}</Layout.Col>
                                        <Layout.Col span={8}>{item.plan}</Layout.Col>
                                        <Layout.Col span={2} offset={3}>
                                            <Button type="success" icon="edit" size={'mini'}
                                                    onClick={this.editTodo.bind(this, key)}>Edit</Button>
                                        </Layout.Col>

                                        <Layout.Col span={2}>
                                            <Button type="danger" icon="delete" size={'mini'}
                                                    onClick={this.deleteTodo.bind(this, key)}>Delete</Button>
                                        </Layout.Col>
                                    </Layout.Row>
                                    }
                                    {this.state.todoMark == key &&
                                    <Layout.Row>
                                        <Todos ref='edittodo' submitTodo={this.modifyTodo.bind(this, key)} item={item}
                                               editMark={true} cancelTodo={this.cancelTodo.bind(this)}/>
                                    </Layout.Row>
                                    }
                                </div>
                            )
                        })
                        }

                        {this.state.TodoAdd == true &&

                        <Todos ref='todo' submitTodo={this.submitTodo}/>

                        }
                        <Layout.Row>
                            <Layout.Col span={24} style={{paddingLeft: '30px', paddingTop: '8px'}}>
                                <Button type="text" onClick={this.addTodo.bind(this)}>Add A New Plan</Button>
                            </Layout.Col>
                        </Layout.Row>

                        {this.state.todos.length > 0 &&

                        (<Layout.Row>
                            <Layout.Col span={8} offset={16}>
                                <Button type='success' onClick={this.props.submitSchedule}
                                        style={{'float': 'right', margin: '10px'}}>Save All Plans</Button>
                                <Button type='danger' onClick={this.props.cancelSchedule}
                                        style={{'float': 'right', margin: '10px'}}>Cancel</Button>
                            </Layout.Col>
                        </Layout.Row>)

                        }
                    </div>
                </div>
                }
                {this.props.viewMark==true &&
                <div>aa</div>
                }
            </div>
                )
    }



}