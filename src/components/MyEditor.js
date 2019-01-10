import React, { Component } from 'react';
import { EditorState,ContentState,convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),

        };
    }

    onEditorStateChange= (editorState) => {
        this.setState({
            editorState,
        });
        console.log(this.state.editorState.data);
    };


    render() {
        const { editorState } = this.state;
        return (
            <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
                <div>{}</div>
            </div>

        )
    }
}

export default MyEditor;