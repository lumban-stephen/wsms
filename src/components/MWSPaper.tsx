// PaperContainer.tsx
import React, { ReactNode } from 'react';
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

interface PaperContainerProps {
    children: ReactNode;
}

const MWSPaper: React.FC<PaperContainerProps> = ({ children }) => {
    return (
        <StyledPaper elevation={24}>
            {children}
        </StyledPaper>
    );
}

export default MWSPaper;
