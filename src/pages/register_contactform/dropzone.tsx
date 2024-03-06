import { Paper } from '@mui/material';
import React, { useCallback, useState } from 'react';
import {FileWithPath, useDropzone} from 'react-dropzone';

const AddImage = () => {
    const [files, setFiles] = useState<FileWithPath[]>([])
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        console.log(acceptedFiles);
    }, []);    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*':[]}
    })
    return(
        <Paper
        sx={{
            cursor:'pointer',
            background:'#fafafa',
            color:'#bdbdbd',
            border:'1px solid #ccc',
            '&:hover':{border:'1px solid #ccc'}
        }}>
            <div style={{padding:'16px'}} {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive?(
                    <p style={{color: 'green'}}>Drop the Files here</p>
                ):(
                    <p>Drag n Drop files here, or click idk</p>
                )}
                <em>(images with *.jpeg, *.jpg extention will be accepted)</em>
            </div>
        </Paper>
    )
}

export default AddImage;