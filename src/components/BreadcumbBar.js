import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb} from 'element-react';
export default class BreadcumbBar extends Component{

    render(){
        return (
            <div className="col-sm-12 breadcrumb">
                <Breadcrumb separator="/">
                    {this.props.nav_arr.map(item=><Breadcrumb.Item>{item}</Breadcrumb.Item>
                )}
                </Breadcrumb>
            </div>
        )
    }

}