import React,{Component} from 'react';
import {Button,Layout, Alert, Message, Input,DatePicker,Badge} from 'element-react';
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
        switch (this.props.mode) {
            case 'edit':
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
                                    return (
                                        <div>
                                            {this.state.todoMark !== key &&
                                            <Todos item={item} mode={'view'} editTodo={this.editTodo.bind(this, key)}
                                                   deleteTodo={this.deleteTodo.bind(this, key)} key={key}/>
                                            }
                                            {this.state.todoMark == key &&
                                            <Layout.Row>
                                                <Todos ref='edittodo' submitTodo={this.modifyTodo.bind(this, key)}
                                                       item={item}
                                                       mode={'edit'} cancelTodo={this.cancelTodo.bind(this)}/>
                                            </Layout.Row>
                                            }
                                        </div>
                                    )
                                })
                                }

                                {this.state.TodoAdd == true &&

                                <Todos ref='todo' submitTodo={this.submitTodo} mode={'add'}/>

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

                    </div>
                );
                break;

            case 'view': {
                let item=this.props.item;
                return (
                    <Layout.Row style={{
                        borderBottom: 'solid 1px #bfcbd9',
                        backgroundColor: '#f4e9c1', padding: '10px',
                    }}>
                        <Layout.Col span={12}>
                            <Badge value={item.todos.length}>
                                <Button size="large">{new Date(item.date).toLocaleDateString()}</Button>
                            </Badge>
                        </Layout.Col>
                        {this.props.editSchedule &&
                        <Layout.Col span={6}>
                            <Button type="success" icon="edit" size={'mini'}
                                    onClick={this.props.editSchedule}>Edit
                            </Button>
                        </Layout.Col>
                        }
                        {this.props.deleteSchedule &&
                        <Layout.Col span={6}>
                            <Button type="danger" icon="delete" size={'mini'}
                                    onClick={this.props.deleteSchedule}>Delete
                            </Button>
                        </Layout.Col>
                        }
                    </Layout.Row>
                );
                break;
            }

            case 'paneview':{
                let item=this.props.item;
                return(
                    <Layout.Col span={24} style={{marginTop:'16px',padding:'10px'}}>
                        <Layout.Row>
                            <h3>{new Date(item.date).toLocaleDateString()}</h3>
                            {item.todos.length > 0 &&
                                item.todos.map((todo,key)=>{
                                   return(
                                       <Todos mode={'view'} item={todo} />
                                   )
                                })

                            }
                        </Layout.Row>
                    </Layout.Col>
                );
                break;
            }

        }
    }



}