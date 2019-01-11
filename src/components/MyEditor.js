import React, { Component } from 'react';
import { EditorState ,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            editorState: EditorState.createEmpty(),
        };
    }

    handleClearContent = ()=>{
        this.setState({
            editorState:'',
        })
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };


    render() {
        const { editorContent,editorState } = this.state;
        return (
            <div>
            <Editor ref='myeditor'
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                // onContentStateChange={this.onEditorChange}
            />
                {/*<div dangerouslySetInnerHTML={{__html:draftjs(convertToRaw(this.state.editorState.getCurrentContent()))}}></div>*/}
            </div>

        )
    }
}

export default MyEditor;