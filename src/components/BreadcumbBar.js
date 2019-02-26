import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Icon} from 'element-react';
export default class BreadcumbBar extends Component{


    render(){

        return (
            <div className=" breadcrumb">

                <Breadcrumb separator="/" >
                    {this.props.back==true &&
                        <Breadcrumb.Item>
                            <span onClick={this.props.handleBack}><Icon name={'arrow-left'}></Icon></span>
                        </Breadcrumb.Item>
                    }
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