import React,{Component} from 'react';
import {Button,Layout, Alert, Message, Input,TimeSelect} from 'element-react';
export default class Todos extends Component{

    constructor(props) {
        super(props)
        this.state = {
            startDate: this.props.item?this.props.item.startDate:new Date(2016, 9, 10, 14, 30),
            endDate: this.props.item?this.props.item.endDate:new Date(2016, 9, 10, 15, 30),
            plan:this.props.item?this.props.item.plan:''
        }
    }

    handleStartUpdate(startDate) {

        this.setState({startDate})
    }

    handleEndUpdate(endDate){

        this.setState({endDate})
    }

    handlePlan=(value)=>{
        this.setState({plan:value});
    }

    render() {
        switch (this.props.mode){
            case 'edit':return(
                <Layout.Row gutter="20" style={{marginTop:'20px', paddingLeft:'30px'}}>
                    <Layout.Col span={4}>
                        <TimeSelect
                            start="08:30"
                            step="00:15"
                            end="21:30"
                            onChange={this.handleStartUpdate.bind(this)}
                            value={this.state.startDate}
                            placeholder="选择时间"
                        />
                    </Layout.Col>

                    <Layout.Col span={4}>
                        <TimeSelect
                            start="08:30"
                            step="00:15"
                            end="21:30"
                            onChange={this.handleEndUpdate.bind(this)}
                            value={this.state.endDate}
                            minTime={this.state.startDate}
                            placeholder="选择时间"
                        />
                    </Layout.Col>
                    <Layout.Col span={10}>
                        <Input placeholder="Plan" onChange={this.handlePlan} value={this.state.plan} />
                    </Layout.Col>
                    <Layout.Col span={6}>

                        <div style={{float:'right',marginRight:'20px'}}>
                            <Button type="text" onClick={this.props.cancelTodo} style={{color:'red'}}><i className="el-icon-close el-icon-right"></i></Button>
                            <Button type="text" onClick={this.props.submitTodo} style={{color:'green'}}><i className="el-icon-check el-icon-right"></i></Button>
                        </div>

                        {/*{this.props.editMark == undefined &&*/}
                        {/*<Button type="text" onClick={this.props.submitTodo}><i className="el-icon-plus el-icon-right"></i></Button>*/}
                        {/*}*/}
                    </Layout.Col>
                </Layout.Row>
            );
            break;
            case 'add':return(
                <Layout.Row gutter="20" style={{marginTop:'20px', paddingLeft:'30px'}}>
                    <Layout.Col span={4}>
                        <TimeSelect
                            start="08:30"
                            step="00:15"
                            end="21:30"
                            onChange={this.handleStartUpdate.bind(this)}
                            value={this.state.startDate}
                            placeholder="选择时间"
                        />
                    </Layout.Col>

                    <Layout.Col span={4}>
                        <TimeSelect
                            start="08:30"
                            step="00:15"
                            end="21:30"
                            onChange={this.handleEndUpdate.bind(this)}
                            value={this.state.endDate}
                            minTime={this.state.startDate}
                            placeholder="选择时间"
                        />
                    </Layout.Col>
                    <Layout.Col span={10}>
                        <Input placeholder="Plan" onChange={this.handlePlan} value={this.state.plan} />
                    </Layout.Col>
                    <Layout.Col span={6}>
                        <Button type="text" onClick={this.props.submitTodo}><i className="el-icon-plus el-icon-right"></i></Button>
                    </Layout.Col>
                </Layout.Row>
            );
                break;
            case 'view': {
                let item=this.props.item;
                let e_startDate, e_endDate;
                if ((typeof item.startDate) == 'string') {
                    e_startDate = new Date(item.startDate);
                } else {
                    e_startDate = item.startDate;
                }
                if ((typeof this.props.item.endDate) == 'string') {
                    e_endDate = new Date(item.endDate);
                } else {
                    e_endDate = item.endDate;
                }
                let startMin = e_startDate.getMinutes() <= 9 ? '0' + e_startDate.getMinutes().toString() : e_startDate.getMinutes().toString();
                let endMin = e_endDate.getMinutes() <= 9 ? '0' + e_endDate.getMinutes().toString() : e_endDate.getMinutes().toString();
                return (
                    <Layout.Row gutter={"60"} style={{
                        marginTop: '20px',
                        marginLeft: '0',
                        marginRight: '0',
                        borderBottom: 'solid 1px #bfcbd9',
                        backgroundColor: '#f4e9c1'
                    }} >
                        <Layout.Col
                            span={6}>{e_startDate.getHours() + ':' + startMin + ' - ' + e_endDate.getHours() + ':' + endMin}</Layout.Col>
                        <Layout.Col span={8}>{item.plan}</Layout.Col>
                        {this.props.editTodo &&
                        <Layout.Col span={2} offset={3}>
                            <Button type="success" icon="edit" size={'mini'}
                                    onClick={this.props.editTodo}>Edit</Button>
                        </Layout.Col>
                        }
                        {this.props.deleteTodo &&
                        <Layout.Col span={2}>
                            <Button type="danger" icon="delete" size={'mini'}
                                    onClick={this.props.deleteTodo}>Delete</Button>
                        </Layout.Col>
                        }
                    </Layout.Row>
                )
            }
            break;
            }
        }
        // return (
        //     <Layout.Row gutter="20" style={{marginTop:'20px', paddingLeft:'30px'}}>
        //         <Layout.Col span={4}>
        //             <TimeSelect
        //                 start="08:30"
        //                 step="00:15"
        //                 end="21:30"
        //                 onChange={this.handleStartUpdate.bind(this)}
        //                 value={this.state.startDate}
        //                 placeholder="选择时间"
        //             />
        //         </Layout.Col>
        //
        //         <Layout.Col span={4}>
        //             <TimeSelect
        //                 start="08:30"
        //                 step="00:15"
        //                 end="21:30"
        //                 onChange={this.handleEndUpdate.bind(this)}
        //                 value={this.state.endDate}
        //                 minTime={this.state.startDate}
        //                 placeholder="选择时间"
        //             />
        //         </Layout.Col>
        //
        //         <Layout.Col span={10}>
        //     <Input placeholder="Plan" onChange={this.handlePlan} value={this.state.plan} />
        //         </Layout.Col>
        //         <Layout.Col span={6}>
        //             {this.props.editMark == true &&
        //                 <div style={{float:'right',marginRight:'20px'}}>
        //                     <Button type="text" onClick={this.props.cancelTodo} style={{color:'red'}}><i className="el-icon-close el-icon-right"></i></Button>
        //                     <Button type="text" onClick={this.props.submitTodo} style={{color:'green'}}><i className="el-icon-check el-icon-right"></i></Button>
        //                 </div>
        //             }
        //             {this.props.editMark == undefined &&
        //             <Button type="text" onClick={this.props.submitTodo}><i className="el-icon-plus el-icon-right"></i></Button>
        //             }
        //         </Layout.Col>
        //     </Layout.Row>
        // )




}