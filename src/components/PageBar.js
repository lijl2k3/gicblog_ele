import React,{Component} from 'react';
import {Pagination} from 'element-react';
export default class PageBar extends Component{

    constructor(){
        super();
        this.state={
            psize:5,
            cur:1
        }
    }
    handleSizeChange=(val)=>{
       this.state.psize=val;
       this.state.cur=1;
       this.forceUpdate();
       this.props.handleList();
    }

    handleCurrentChange=(val)=>{
        this.state.cur=val;
        this.forceUpdate();
        this.props.handleList();
    }

    componentWillMount(){
        this.setState({cur:this.props.cur,psize:this.props.psize});
    }

    render(){
        return (
            <div className="block">
                <Pagination layout="total, sizes, prev, pager, next" total={this.props.total} pageSizes={[5,10]} pageSize={this.state.psize} currentPage={this.state.cur}
                            onCurrentChange={this.handleCurrentChange.bind(this)}
                            onSizeChange={this.handleSizeChange.bind(this)}
                />
            </div>
        )
    }

}