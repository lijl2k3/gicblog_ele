import React,{Component} from 'react';
import {Form,Input,Button,Layout,DatePicker} from 'element-react';
export default class FilterBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                contents: '',
                author: '',
                startDate:'',
                endDate:''
            }
        };
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render(){
        // const startDate=new Date(this.state.form.startDate);
        // const endDate=new Date(this.state.form.endDate)
        const{startDate,endDate}=this.state.form;
        return (
                <Layout.Row >
                <Layout.Col span="24"  className={"searchbar"}>

                    <Layout.Col span="2" >
                        <Input placeholder="title" onChange={this.onChange.bind(this,'title')} value={this.state.form.title}/>
                    </Layout.Col>
                    <Layout.Col span="4" style={{marginLeft:"10px"}}>
                        <Input placeholder="contents" onChange={this.onChange.bind(this,'contents')} value={this.state.form.contents}/>
                    </Layout.Col>
                    <Layout.Col span="2" style={{marginLeft:"10px"}}>
                        <Input placeholder="author" onChange={this.onChange.bind(this,'author')} value={this.state.form.author}/>
                    </Layout.Col>



                    <Layout.Col span="6" style={{marginLeft:"10px"}} >

                        <Layout.Col span={"10"}>
                                <DatePicker
                                    value={startDate}
                                    placeholder="Start Date"

                                    onChange={date=>{
                                        this.state.form.startDate=date;
                                        this.setState({form:this.state.form});
                                    }}
                                    //disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                                />
                        </Layout.Col>
                        <Layout.Col span={"10"} style={{marginLeft:"10px"}}>
                                <DatePicker
                                    value={endDate}
                                    placeholder="End Date"
                                    onChange={date=>{
                                        this.state.form.endDate=date;
                                        this.setState({form:this.state.form});
                                    }}
                                    //disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
                                />
                        </Layout.Col>



                    </Layout.Col>

                    <Layout.Col span="6" push={"3"}>
                        <div style={{"display":"inline-block", float:"right"}}>
                            <Button type="primary" icon="search" onClick={this.props.handleSearch.bind(this,this.state.form)}>Search</Button>
                            <Button type="primary" icon="close" onClick={this.props.handleReset.bind(this,this.state.form)}>Reset</Button>
                        </div>
                    </Layout.Col>

                </Layout.Col>
            </Layout.Row>
        )
    }

}