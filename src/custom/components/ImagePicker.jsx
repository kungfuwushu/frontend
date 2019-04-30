import React, { useState, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';

import './ImagePicker.css';

import { ReactComponent as RemoveIcon } from '../../icons/cancel.svg';
import { ReactComponent as UploadIcon } from '../../icons/upload.svg';

import * as api from '../../api';

const ImagePicker = ({ imageUrl, onChange }) => {
    const [file, setFile] = useState(undefined);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        multiple: false,
        onDrop: files => {
            if (files.length > 0) {
                const file = files[0];
                const imageUrl = URL.createObjectURL(file);
                setFile({
                    ...file,
                    preview: imageUrl
                });
                onChange(imageUrl);
                api.Files.upload(file)
                    .then(response =>
                        onChange(response.fileDownloadUri)
                    )
            }
        },
        disabled: !!imageUrl
    });

    useEffect(() => () => {
        if (file)
            URL.revokeObjectURL(file.preview)
    }, [file]);

    const handleRemove = () => {
        setFile(undefined);
        onChange(undefined);
    }

    return (
        <div {...getRootProps({ className: "ImagePicker" })}>
            <input {...getInputProps()} />
            {imageUrl ?
                <React.Fragment>
                    <div className="uploaded-image">
                        <img src={imageUrl} alt="Upload"/>
                    </div>
                    <RemoveIcon
                        onClick={handleRemove}
                        className="remove-icon"
                    />
                </React.Fragment>
                :
                <div className="upload">
                    <UploadIcon className="upload-icon" />
                    <span>Upload</span>
                </div>
            }
        </div>
    );
}

export default ImagePicker;