import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';


const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: "40px 80px 10px",
    padding: '20px',
    borderRadius: '20px',
    backgroundColor: 'White',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    minHeight: '73vh'
}));

const PaperContainer: React.FC = () => {
    return (
        <StyledPaper>
            
        </StyledPaper>
    );

}

export default PaperContainer;
