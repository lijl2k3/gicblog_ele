import React,{Component} from 'react';
import {Form,Input,Button,Layout, DatePicker, Popover,MessageBox} from 'element-react';
import ResumeAdd from "./ResumeAdd";
import Schedule from "./Schedule";
import FilesAdd from "./FilesAdd";
import { EditorState ,convertToRaw} from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import MyEditor from './MyEditor';
import {_addEvents} from "../api/eventsApi";
import qs from 'qs';
import HeadBar from "./HeadBar";

export default class NewsAdd extends Component{
    constructor(props) {
        super(props);
        this.submitIntro=this.submitIntro.bind(this);
        this.submitSchedule=this.submitSchedule.bind(this);
        this.state = {
            form: {
                title: '',
                contents: '',
                e_startDate:'',
                e_endDate:''
            },
            resumes:[],
            ResumeAdd:false,
            ScheduleAdd:false
        };
    }


    async addEvents(data){
        const res=await _addEvents(qs.stringify(data));
        if(res.data.code==200){
            //sessionStorage.setItem('login','true');
            MessageBox.alert('Succeed in saving records!')
            this.props.history.push('/events');
            //console.log(res.data);
        }
    }
    componentWillMount(){
        // let author=JSON.parse(localStorage.getItem('login')).name;
        // this.state.form.author=author;
        // this.setState(this.state);

    }
    onSubmit(e) {
        e.preventDefault();
        let {title, e_startDate,e_endDate}=this.state.form;
        if(e_startDate==''){
            MessageBox.alert('Please select stat date for the event!');
            return;
        }
        if(e_endDate==''){
            MessageBox.alert('Please select end date for the event!');
            return;
        }
        if(title==''){
            MessageBox.alert('Please input title for the event!');
            return;
        }
        // let contents=draftjs(convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent()));
        if(this.refs.myeditor.state.editorState==undefined){
            MessageBox.alert('Please input description for the event!');
            return;
        }
        let contents=convertToRaw(this.refs.myeditor.state.editorState.getCurrentContent());

        let resumes=this.state.resumes;
        //let files=this.refs.fileslib?this.refs.fileslib.state.fileList:[];
        let data={'title':title, 'contents': JSON.stringify(contents),'start_date':e_startDate,'end_date':e_endDate,'attendees':resumes};
        this.addEvents(data);
        // let newsStr=localStorage.getItem('news');
        // let news=newsStr?JSON.parse(newsStr):[];
        // news.push({id:Date.now(),title, contents,author,pics, date:Date.now()});
        // localStorage.setItem('news',JSON.stringify(news));
        //this.props.history.push('/news');

    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    changeText(){
       this.state.form.contents=this.refs.myeditor.state.editorState;
        this.setState({form:this.state.form});
    }

    submitIntro(){
        let resume={pic:this.refs.resume.state.pic, intro:this.refs.resume.state.intro, name:this.refs.resume.state.name};
        //this.setState({...resumes,resume});
        this.state.resumes.push(resume);
        this.setState({resumes:this.state.resumes});
        //this.setState({resumes: [...this.state.resumes, resume]});
        this.refs.resume.state.pic={};
        this.refs.resume.state.intro='';
        this.refs.resume.state.name='';
        this.state.resumeAdd=false;
        console.log(this.refs.resume.state);
    }

    submitSchedule(){

    }



    // handleSubmit=()=>{
    //     let title=this.title.value;
    //     let contents=this.contents.value;
    //     let newsStr=localStorage.getItem('news');
    //     let news=newsStr?JSON.parse(newsStr):[];
    //     news.push({id:Date.now(),title, contents});
    //     localStorage.setItem('news',JSON.stringify(news));
    //     this.props.history.push('/blog/news');
    //     //this.props.history.goBack();
    // }

    handleReset(e) {

        e.preventDefault();
        // if(this.refs.form)
        //     console.log(this.refs.form);
        this.refs.form.resetFields();
        this.setState({form:{title:'',contents:'',pics:[]},picAdd:false,fileAdd:false});
    }

    addResume(){

        this.setState({resumeAdd:true});
        this.setState({scheduleAdd:false});
    }

    addSchedule(){

        this.setState({scheduleAdd:true});
        this.setState({resumeAdd:false});
    }

    addPic(){
        this.setState({picAdd:true});
    }

    handleClose=key=>{
        let resumes=this.state.resumes.filter((item,index)=>{
            return index!==key;
        });
        console.log(key);
        this.setState({resumes:resumes});
    }

    render(){
        const {e_startDate, e_endDate}=this.state.form;
        return (
            <div>
                <HeadBar/>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Add Event </h2>
            <Form model={this.state.form} ref='form' labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item>
                <div style={{'float':'right'}}>
                    <Button type="success" nativeType="submit">Save</Button>
                    <Button onClick={this.handleReset.bind(this)}>Cancel</Button>
                </div>
                </Form.Item>
                <Form.Item label="Title">
                    <Input value={this.state.form.title}  placeholder='Add Title Here' onChange={this.onChange.bind(this, 'title')}></Input>
                </Form.Item>
                <Form.Item>
                    <MyEditor ref='myeditor'/>
                </Form.Item>
                <Form.Item>
                <Layout.Col span="12" >
                    <DatePicker
                        value={e_startDate}
                        placeholder="Start Date"
                        onChange={date=>{
                            this.state.form.e_startDate=date;
                            this.setState({form:this.state.form});
                        }}
                    />
                </Layout.Col>
                <Layout.Col span="12" >
                    <DatePicker
                        value={e_endDate}
                        placeholder="End Date"
                        onChange={date=>{
                            this.state.form.e_endDate=date;
                            this.setState({form:this.state.form});
                        }}
                    />
                </Layout.Col>
                </Form.Item>
                {this.state.resumes.length > 0 &&
                <Form.Item>
                    <Layout.Row>
                        <Layout.Col span="24">
                            <h2>{this.state.resumes.length} Attendee(s) added:</h2>

                            {this.state.resumes.map((item,key)=>{
                                let imgsrc="http://localhost/gicapi/public/static/attendees/avatar_noname.png";
                                console.log(item.pic);
                                if(Object.keys(item.pic).length>0){
                                    imgsrc="http://localhost/gicapi/public/thumbnail/"+item.pic.path+'/'+item.pic.name;
                                }
                                    return(

                                        <Layout.Col span="8" style={{'marginBottom':'30px','marginRight':'20px'}} key={key}>
                                            <div  style={{width:'120px'}} style={{'border': 'solid #333 1px','padding':'20px',position:'relative'}}>
                                                <img style={{'width':'95%'}} src={imgsrc} />
                                                <Popover placement="top-start" title={item.name} width="400" trigger="click" content={item.intro}>
                                                    <Button style={{width:'95%'}}>More</Button>
                                                </Popover>
                                                <div className='close' onClick={this.handleClose.bind(this,key)} ></div></div>

                                        </Layout.Col>

                                    )
                                }
                            ) }

                    </Layout.Col>
                    </Layout.Row>
                </Form.Item>
                }
                <Form.Item>
                    <Button type="primary"  onClick={this.addResume.bind(this)}>Add Attendee <i className="el-icon-upload el-icon-right"></i></Button>
                    <Button type="primary"  onClick={this.addSchedule.bind(this)}>Add Schedule <i className="el-icon-upload el-icon-right"></i></Button>
                </Form.Item>
                <Form.Item>
                    {this.state.resumeAdd == true &&
                    <ResumeAdd ref='resume' submitIntro={this.submitIntro}/>
                    }
                </Form.Item>

                <Form.Item>
                    {this.state.scheduleAdd == true &&
                    <Schedule ref='schedule' submitSchedule={this.submitSchedule}/>
                    }
                </Form.Item>
                {/*<Form.Item>*/}
                    {/*{this.state.fileAdd == true &&*/}
                    {/*<FilesAdd ref='fileslib' oldfiles={[]}/>*/}
                    {/*}*/}
                {/*</Form.Item>*/}


            </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )

    }

}