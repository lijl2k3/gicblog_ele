import React,{Component} from 'react';
import {Upload,Button,Layout} from 'element-react';
export default class GalleryAdd extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        const fileList = [
        ];
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="12" offset="4">
                        <h2> Add Pictures Here </h2>
            <Upload
                className="upload-demo"
                ref="upload"
                action="//jsonplaceholder.typicode.com/posts/"
                //onPreview={file => this.handlePreview(file)}
                //onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                fileList={fileList}
                autoUpload={false}
                tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
                trigger={<Button size="small" type="primary">Choose File</Button>}
            >
                <Button style={{ marginLeft: '10px'}} size="small" type="success" onClick={() => this.submitUpload()}>Upload</Button>
            </Upload>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )

    }

    submitUpload(){
        this.refs.upload.submit();
    }
}