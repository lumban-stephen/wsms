import React, { useState } from 'react';
import { Button } from '@mui/material';
import MWSDialogPaperView from './MWSDialogPaperView';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
    variant: "contained",
    marginRight: 3,
    color: "primary"
}));

const MWSButtonRenew: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState<any>(null); // Assuming you have rowData state to store data for the dialog

    const handleRenew = () => {
        // Fetch row data for the dialog
        // Example:
        // const rowData = fetchDataForDialog();
        // setRowData(rowData);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" sx={{ marginRight: 3 }} color="primary" onClick={handleRenew}>
                Renew
            </Button>
            <MWSDialogPaperView open={open} onClose={handleClose} row={rowData} />
        </>
    );
};

export default MWSButtonRenew;
