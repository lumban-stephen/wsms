import React, { useCallback, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';

// Interface to define the expected structure of uploaded file information

interface DropProps {
  onDrop: (acceptedFiles: File[]) => void; // Function to handle dropped files
  onUploadSuccess ?: (imageUrl: string) => void; // Optional function for registration submission (assuming string is the image URL)
}

const Drop: React.FC<DropProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    if (imageData) {
      console.log('imageData:', imageData);
    }
  }, [imageData]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];

      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);

      reader.onload = async () => {
        setImageData(reader.result as string);

        // Ensure imageData is not null before appending to FormData
        if (imageData) {
          const formData = new FormData();
          formData.append('image', imageData); // Assuming imageData holds base64 encoded image data

          try {
            const response = await fetch('http://localhost:3000/image/register', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`Error uploading image: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Image upload response:', data);

            // Update state with uploaded image URL (replace with your actual key)
            const uploadedImageUrl = data.imageUrl; // Assuming backend response contains imageUrl

            // Trigger onUploadSuccess from Register.tsx (pass uploadedImageUrl as prop)
            if (onUploadSuccess) {
              onUploadSuccess(uploadedImageUrl);
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            // Handle upload errors (e.g., display error message)
          }
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading image:', error);
        // Handle file reading errors (e.g., display error message)
      };
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
  });

  const getDropzoneMessage = () => {
    return file ? 'Image uploaded successfully!' : (isDragActive ? 'Drop the file here' : 'Drag n Drop file here, or click idk');
  };


  return (
    <Paper
      sx={{
        cursor: 'pointer',
        background: '#fafafa',
        color: '#bdbdbd',
        border: '1px dashed #ccc',
        '&:hover': { border: '1px solid #ccc' },
        width: '100%',
      }}
    >
      <div style={{ padding: '16px' }} {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={{ color: 'green' }}>{getDropzoneMessage()}</p>
      </div>
    </Paper>
  );
};

export default Drop;
