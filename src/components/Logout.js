import React,{Component} from 'react';
import {Form,Input,Button,Layout,Icon} from 'element-react';
import {_logout} from "../api/userApi";


export default class  Login extends Component{
        async logout(){
            const res=await _logout();
            if(res.data.code==200){
            sessionStorage.setItem('login',0);
            this.props.history.push('/login');
                }
            }

        componentWillMount(){
            this.logout();
        }

        render(){
            return(
                <div><span><Icon name="loading">Loading...</Icon></span></div>
            )
        }
}

