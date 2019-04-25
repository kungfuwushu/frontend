import React, { useState } from 'react';
import { Upload, Icon } from 'antd';

const ImagePicker = ({onPicked}) => {
    const [ fileList, setFileList ] = useState([]);

    const handleChange = ({fileList}) => {
        setFileList(fileList);
        onPicked(undefined);
    }

    return (
        <Upload
            name="image"
            listType="picture-card"
            className="ImagePicker"
            fileList={fileList}
            action="https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts/"
            onChange={handleChange}
        >
            {fileList.length >= 1 || 
                <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                </div>
            }
        </Upload>
    );
}

export default ImagePicker;