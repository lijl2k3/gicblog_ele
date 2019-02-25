import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'element-react';
export default class BreadcumbBar extends Component{

    goBack(){
        console.log('aa');
    }

    render(){
        console.log(this.props.nav_arr)
        return (
            <div className="col-sm-12 breadcrumb">
                <Breadcrumb separator="/">
                    {this.props.nav_arr.map((item,key)=><Breadcrumb.Item key={key}>
                        {item.to !== undefined &&
                        <Link to={item.to} style={{'textDecoration': 'none'}}>{item.txt}</Link>
                        }
                        {item.to==undefined &&
                        <span>{item.txt}</span>
                        }
                    </Breadcrumb.Item>
                )}
                </Breadcrumb>
            </div>
        )
    }

}