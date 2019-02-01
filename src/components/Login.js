import React,{Component} from 'react';
import {Form,Input,Button,Layout} from 'element-react';
import {_login} from "../api/userApi";
import qs from 'qs';

export default class  Login extends Component{
    // return(<Button type='primary' onClick={
    //     ()=>{localStorage.setItem('login',true);
    //         props.history.push(props.location.state.from);
    //     }
    // }>Login</Button>)

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                password: '',
            },
        };
    }

    async login(data){
        const res=await _login(qs.stringify(data));
        if(res.data.code==200){
            console.log(res);
            sessionStorage.setItem('login','true');
            this.props.history.push(this.props.location.state.from);
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let {name,password}=this.state.form;
        let data={'uname':name, 'pwd':password};
        this.login(data);
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