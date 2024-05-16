import React, { useState } from 'react';
import { Avatar, Button, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import ButtonRenew from '../components/MWSButtonRenew';
import ButtonSuspend from '../components/MWSButtonSuspend';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '95%', 
    height: '70%', 
    maxWidth: 1200, 
    maxHeight: 600, 
    overflow: 'auto', 
    padding: '20px', 
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
}));

const BackgroundOverlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
});

interface Props {
    open: boolean;
    onClose: () => void;
    row: any; // Define the type of your row data here
}

const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const MWSDialogPaperView: React.FC<Props> = ({ open, onClose, row }) => {
    if (!row) {
        return null;
    }

    const handleDialogClose = () => {
        onClose(); // Call the onClose function passed as prop
    };

    return (
        <>
            {open && (
                <BackgroundOverlay>
                    <StyledPaper>
                        <DialogContent sx={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
                            <>
                                <div>
                                    <Avatar alt={row.name} src={row.avatar} sx={{ marginLeft: "30px", width: 200, height: 200 }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: "1.5rem" }}><span style={{ fontSize: "2rem", fontWeight: "bold" }}>{row.name}</span>, <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>{row.age}</span></p>
                                    <p style={{ fontSize: "1.5rem" }}><span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>{row.department}</span>, <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>{row.course}</span></p>
                                </div>
                            </>
                        </DialogContent>
                        <DialogContent sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
                            <>
                                <div>
                                    <p style={{ marginLeft: "30px" }}>Address:</p>
                                    <p style={{ marginLeft: "30px" }}>Last School Attend: </p>
                                    <p style={{ marginLeft: "30px" }}>Facebook Account: </p>
                                    <p style={{ marginLeft: "30px" }}>Contact #: </p>
                                </div>
                                <div>
                                    <p>AAAAAAAAAAAAAAAAAAAA</p>
                                    <p>AAAAAAAAAAAAAAAAAAA</p>
                                    <p>AAAAAAAAAAAAAAAaA</p>
                                    <p>AAAAAAAAAAAAAAA</p>
                                </div>
                                <div>
                                    <p style={{ marginLeft: "30px" }}>Guardian Name: </p>
                                    <p style={{ marginLeft: "30px" }}>Guardian Contact: </p>
                                </div>
                                <div>
                                    <p>AAAAAAAAAAAAAAAAAAAAAA</p>
                                    <p>AAAAAAAAAAAAAAAAA</p>
                                </div>
                                <div>
                                    <p style={{ marginLeft: "120px" }}>Contract Start: </p>
                                </div>
                                <div>
                                    <p>{formatDate(row.start)}</p>
                                </div>
                                <div>
                                    <p style={{ marginLeft: "120px" }}>Contract End: </p>
                                </div>
                                <div>
                                    <p>{formatDate(row.end)}</p>
                                </div>
                            </>
                        </DialogContent>
                        <DialogActions sx={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: '20px' , justifyContent: 'center', flexDirection: 'column' }}>
                            <>
                            <div>
                            <ButtonRenew onClick={handleDialogClose} />
                            </div>
                            <div>
                            <ButtonSuspend onClick={handleDialogClose}/>
                            </div>
                            </>
                        </DialogActions>
                    </StyledPaper>
                </BackgroundOverlay>
            )}
        </>
    );
};

export default MWSDialogPaperView;
