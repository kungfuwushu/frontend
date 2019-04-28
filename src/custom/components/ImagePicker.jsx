import React, { useState, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';

import './ImagePicker.css';

import { ReactComponent as RemoveIcon } from '../../icons/cancel.svg';
import { ReactComponent as UploadIcon } from '../../icons/upload.svg';

const ImagePicker = ({ imageUrl, onChange }) => {
    const [file, setFile] = useState(undefined);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        multiple: false,
        onDrop: files => {
            if (files.length > 0) {
                const imageUrl = URL.createObjectURL(files[0]);
                setFile({
                    ...files[0],
                    preview: imageUrl
                });
                onChange(imageUrl);
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