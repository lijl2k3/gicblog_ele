import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'element-react';
import {_logout} from "../api/userApi";
export default class HeadBar extends Component{
    constructor(props){
        super(props);
        this.state={login:0}
    }

    componentWillMount(){
        let login=sessionStorage.getItem('login')?sessionStorage.getItem('login'):0;
        this.setState({login:login});

    }



    render(){

        return (
            <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
                <Menu.Item index="1"><Link to='/home'>Home</Link></Menu.Item>
                <Menu.SubMenu index="2" title="Documents">
                    <Menu.Item index="2-1"><Link to='/news' style={{'textDecoration':'none'}}>News List</Link></Menu.Item>
                    <Menu.Item index="2-2"><Link to='/newsAdd' style={{'textDecoration':'none'}}>Add News</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu index="3" title="My Account">
                    <Menu.Item index="3-1">My Favorite</Menu.Item>
                    <Menu.Item index="3-2"><Link to='/mydoc' style={{'textDecoration':'none'}}>My Documents</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.Item index="4">My Settings</Menu.Item>


                <div className="loginout">
                    {this.state.login==0 &&
                    <Link to='/login' style={{textDecoration: 'none',color:'#bfcbd9' }}>Login</Link>
                    }
                    {this.state.login==1 &&
                    <Link to='/logout' style={{textDecoration: 'none',color:'#bfcbd9' }}>Logout</Link>
                    }
                </div>

            </Menu>
        )
    }

}