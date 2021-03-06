import React,{Component} from 'react';
import {Form,Input,Button,Layout, DatePicker,MessageBox, Badge,Icon,Dialog} from 'element-react';
import Resume from "./Resume";
import Schedule from "./Schedule";
import FilesAdd from "./FilesAdd";
import { EditorState ,convertToRaw} from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import MyEditor from './MyEditor';
import {_addEvents} from "../api/eventsApi";
import qs from 'qs';
import HeadBar from "./HeadBar";

export default class EventsAdd extends Component{
    constructor(props) {
        super(props);
        this.submitIntro=this.submitIntro.bind(this);
        this.submitSchedule=this.submitSchedule.bind(this);
        this.state = {
            form: {
                title: '',
                contents: '',
                e_startDate:null,
                e_endDate:null
            },
            resumes:[],
            schedules:[],
            ResumeAdd:false,
            ScheduleAdd:false,
            oldSchedule:{},
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
        if(e_startDate==null){
            MessageBox.alert('Please select stat date for the event!');
            return;
        }
        if(e_endDate==null){
            MessageBox.alert('Please select end date for the event!');
            return;
        }
        if(title.trim()==''){
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
        let schedules=this.state.schedules;
        //let files=this.refs.fileslib?this.refs.fileslib.state.fileList:[];
        let data={'title':title, 'contents': JSON.stringify(contents),'start_date':e_startDate.toLocaleDateString(),'end_date':e_endDate.toLocaleDateString(),'attendees':resumes, 'schedules':schedules};
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
        this.refs.resume.state.imageUrl='';
        console.log(this.refs.resume.state);
    }

    submitSchedule(){
        if(this.refs.schedule.state.value1==null){
            MessageBox.alert('Please input Date!');
            return;
        }
        if(this.refs.schedule.state.todos.length==0){
            MessageBox.alert('Please add at least one plan!');
            return;
        }
        let schedule={date:this.refs.schedule.state.value1, todos: this.refs.schedule.state.todos};
        this.state.schedules.push(schedule);
        this.setState({schedules:this.state.schedules,scheduleAdd:false});
        this.refs.schedule.setState({todos:[],value1:null});


    }

    modifySchedule=key=>{
        let schedule={date:this.refs.editschedule.state.value1, todos: this.refs.editschedule.state.todos};
        this.state.schedules[key]=schedule;
        this.setState({schedules:this.state.schedules,scheduleMark:null, scheduleAdd:false});
        console.log(this.state.schedules[key].todos.length);
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
    }

    editResume(key){
        let {attendeeMark}=this.state;
        this.setState({attendeeMark:key});
        this.setState({oldAttendee:JSON.parse(JSON.stringify(this.state.resumes[key]))});
    }

    modifyResume=key=>{
        let resume=this.refs.editattendee.state;
        this.state.resumes[key]=resume;
        this.setState({resumes:this.state.resumes,attendeeMark:null});
    }

    cancelAttendee=(key)=>{
        this.setState({attendeeMark:null});
        //this.refs.editattendee.setState({imageUrl:'', pic:{}, intro:'', name:'',});
    }

    cancelIntro(){
        this.setState({resumeAdd:false});
        this.refs.resume.state.pic={};
        this.refs.resume.state.intro='';
        this.refs.resume.state.name='';
        this.refs.resume.state.imageUrl='';
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
        this.setState({resumes:resumes});
    }
    editSchedule=(key)=>{
        let {scheduleMark}=this.state;
        this.setState({scheduleMark:key});
        this.setState({oldSchedule:JSON.parse(JSON.stringify(this.state.schedules[key]))});


    }
    cancelSchedule=(key)=>{
        this.setState({scheduleMark:null, scheduleAdd:false});
        this.state.schedules[key]=this.state.oldSchedule;
        this.setState({schedules:this.state.schedules});
        this.setState({oldSchedule:{}});
        this.refs.schedule.setState({todos:[],value1:null});
    }
    deleteSchedule=(key)=>{
        this.setState({
            schedules:this.state.schedules.filter((item,index)=>{
                return index!==key;
            })
        })
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
                <Form.Item>
                    <Button type="primary"  onClick={this.addResume.bind(this)}>Add Attendee <i className="el-icon-upload el-icon-right"></i></Button>
                    <Button type="primary"  onClick={this.addSchedule.bind(this)}>Add Schedule <i className="el-icon-upload el-icon-right"></i></Button>

                </Form.Item>
                {/*<Form.Item>*/}
                    {/*{this.state.resumeAdd == true &&*/}
                    {/*<Resume ref='resume' submitIntro={this.submitIntro} mode={'add'}/>*/}

                    {/*}*/}
                {/*</Form.Item>*/}
                {/*<Form.Item>*/}
                    {/*{this.state.scheduleAdd == true &&*/}
                    {/*<Schedule ref='schedule'  mode='edit' submitSchedule={this.submitSchedule} cancelSchedule={this.cancelSchedule.bind(this)}/>*/}
                    {/*}*/}
                {/*</Form.Item>*/}

                <Dialog
                    className={'center'}
                    title="Add Attendee"
                    size="full"
                    visible={ this.state.resumeAdd }
                    onCancel={ this.cancelIntro.bind(this) }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <Resume ref='resume' submitIntro={this.submitIntro} mode={'add'}/>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick= {this.cancelIntro.bind(this)} >Cancel</Button>
                        <Button type="primary" onClick={ this.submitIntro }>Submit</Button>
                    </Dialog.Footer>
                </Dialog>

                <Dialog
                    className={'center'}
                    title="Add Schedule"
                    size="full"
                    visible={ this.state.scheduleAdd }
                    onCancel={ this.cancelSchedule.bind(this) }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <Schedule ref='schedule' submitIntro={this.submitSchedule} mode={'edit'}/>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick= {this.cancelSchedule.bind(this)} >Cancel</Button>
                        <Button type="primary" onClick={ this.submitSchedule }>Submit</Button>
                    </Dialog.Footer>
                </Dialog>



                {(this.state.resumes.length > 0) &&
                    <div>
                <Form.Item>
                    <Layout.Row>
                        <Layout.Col span="24">
                            <h2>{this.state.resumes.length} Attendee(s) added:</h2>

                            {this.state.resumes.map((item,key)=>{
                                return(
                                    <div>
                                <Resume ref='resumeview'item={item} mode={'viewpop'} handleClose={this.handleClose.bind(this,key)} editResume={this.editResume.bind(this,key)} key={key}/>

                                        <Dialog
                                            className={'center'}
                                            title="Edit Attendee"
                                            size="full"
                                            visible={ this.state.attendeeMark==key }
                                            onCancel={ this.cancelAttendee.bind(this,key) }
                                            lockScroll={ false }
                                            >
                                            <Dialog.Body>
                                                <Layout.Row>
                                                    <Resume ref='editattendee' mode='edit' item={item}/>
                                                </Layout.Row>
                                            </Dialog.Body>
                                            <Dialog.Footer className="dialog-footer">
                                                <Button onClick= {this.cancelAttendee.bind(this,key)} >Cancel</Button>
                                                <Button type="primary" onClick={ this.modifyResume.bind(this,key) }>Submit</Button>
                                            </Dialog.Footer>
                                        </Dialog>
                                    </div>
                                )
                                }
                            ) }

                    </Layout.Col>
                    </Layout.Row>
                </Form.Item>

                    </div>
                }
                {this.state.schedules.length>0  &&
                    <Form.Item>
                        <Layout.Row>
                            <h2>{this.state.schedules.length} Schedule(s) added:</h2>
                            {this.state.schedules.map((item,key)=>{
                                return(
                                //<Layout.Col span={24}key={key} style={{marginTop:'16px',padding:'10px'}}>
                                    <div>
                                    {this.state.scheduleMark !== key &&
                                    <Layout.Col span={12}key={key} style={{marginTop:'16px',padding:'10px'}}>
                                        <Schedule mode={'view'} editSchedule={this.editSchedule.bind(this,key)} deleteSchedule={this.deleteSchedule.bind(this,key)} item={item}/>
                                    </Layout.Col>
                                    }
                                    {/*{this.state.scheduleMark == key &&*/}
                                    {/*<Layout.Col span={24}key={key} style={{marginTop:'16px',padding:'10px'}}>*/}
                                        {/*<Layout.Row>*/}
                                            {/*<Schedule ref='editschedule' mode='edit'submitSchedule={this.modifySchedule.bind(this,key)} cancelSchedule={this.cancelSchedule.bind(this,key)} item={item}/>*/}
                                        {/*</Layout.Row>*/}
                                    {/*</Layout.Col>*/}
                                    {/*}*/}

                                        <Dialog
                                            className={'center'}
                                            title="Edit Schedule"
                                            size="full"
                                            visible={ this.state.scheduleMark==key }
                                            onCancel={ this.cancelSchedule.bind(this,key) }
                                            lockScroll={ false }
                                        >
                                            <Dialog.Body>
                                                <Layout.Row>
                                                    <Schedule ref='editschedule' mode='edit' item={item}/>
                                                </Layout.Row>
                                            </Dialog.Body>
                                            <Dialog.Footer className="dialog-footer">
                                                <Button onClick= {this.cancelSchedule.bind(this,key)} >Cancel</Button>
                                                <Button type="primary" onClick={ this.modifySchedule.bind(this,key) }>Submit</Button>
                                            </Dialog.Footer>
                                        </Dialog>
                                    </div>

                                )
                            })}
                        </Layout.Row>
                    </Form.Item>
                }


            </Form>

                    </Layout.Col>
                </Layout.Row>



            </div>


        )

    }

}