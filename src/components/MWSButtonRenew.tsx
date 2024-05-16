import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
    marginRight: 5,
}));

interface Props {
    onClick: () => void; // Define onClick prop
}

const MWSButtonRenew: React.FC<Props> = ({ onClick }) => {
    return (
        <StyledButton variant= "contained" color= "primary" onClick={onClick}> {/* Pass onClick prop to StyledButton */}
            Renew
        </StyledButton>
    );
};

export default MWSButtonRenew;
