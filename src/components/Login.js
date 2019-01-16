import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';

export default class  Login extends Component{
    // return(<Button type='primary' onClick={
    //     ()=>{localStorage.setItem('login',true);
    //         props.history.push(props.location.state.from);
    //     }
    // }>Login</Button>)

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            form: {
                name: '',
                password: '',
            },
        };
    }

    handleSubmit(e){
        e.preventDefault();
        const pass_arr=[
            {
                name:'aaa',
                pass:'aaa'
            },
            {
                name:'lijl',
                pass:'lijl'
            }
        ];
        let {name,password}=this.state.form;
        let res=pass_arr.find((item)=>{
            return (item.name==name && item.pass==password);
        });
        if(res){
            localStorage.setItem('login',JSON.stringify(res));
            this.props.history.push(this.props.location.state.from);
        }
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    render(){
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="8" offset="6">
                        <h2> Member Login </h2>
                        <Form model={this.state.form} ref='form' labelWidth="80" onSubmit={this.handleSubmit.bind(this)}>

                            <Form.Item label="Name">
                                <Input value={this.state.form.name}  placeholder='Input Name' onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>
                            <Form.Item label="Password">
                                <Input value={this.state.form.password}  type="password" placeholder='Input Password' onChange={this.onChange.bind(this, 'password')}></Input>
                            </Form.Item>
                            <Form.Item>
                                <div style={{'float':'right'}}>
                                    <Button type="success" nativeType="submit">Login</Button>
                                </div>
                            </Form.Item>

                        </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )

    }

}