import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const TableHeadStyle = styled(TableHead)(({ theme }) => ({
    margin: "10px",
    padding: '20px',
}));

const TableCellStyle = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    flex: '1',
    textAlign: 'center',
    fontSize: "20px"
}));

const TableCellStyleRow = styled(TableCell)(({ theme }) => ({
    flex: '1',
    textAlign: 'center',
    fontSize: "20px"
}));

const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Renewed':
            return 'green';
        case 'Retired':
        case 'Suspended':
            return 'red';
        default:
            return 'gray';
    }
};

const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const MWSTable: React.FC = () => {
    const [selectedRow, setSelectedRow] = useState<any>(null); // State to store the selected row data
    const [open, setOpen] = useState(false); // State to control the modal open/close
    const [actionButtonState, setActionButtonState] = useState<string>(''); // State to store the current status of action buttons
    const [showConfirmationRenewDialog, setShowConfirmationRenewDialog] = useState(false); // State to control the visibility of the confirmation dialog
    const [showConfirmationSuspendDialog, setShowConfirmationSuspendDialog] = useState(false); // State to control the visibility of the confirmation dialog

    // Example data for the table
    let rows = [
        { id: 1, name: 'Gregory House', age: '21y', course: 'BSCS', department: 'College of Computer Studies', contact: '09123456789', start: new Date(2024, 3, 28), end: new Date(2025, 3, 28), status: 'Renewed' },
        { id: 2, name: 'John Wick', age: '21y', course: 'BSA', department: 'College of Business and Accountancy', contact: '09876543210', start: new Date(2024, 2, 15), end: new Date(2025, 2, 15), status: 'Pending' },
        { id: 3, name: 'Bunta Fujiwara', age: '21y', course: 'BSMT', department: 'College of Marine Transportation', contact: '09121234567', start: new Date(2024, 1, 10), end: new Date(2025, 1, 10), status: 'Retired' },
        { id: 4, name: 'Ryo Saeba', age: '21y', course: 'BSIT', department: 'College of Computer Studies', contact: '09121234567', start: new Date(2024, 1, 10), end: new Date(2025, 1, 10), status: 'Suspended' },
    ];

    // Sort rows by ID in descending order
    rows.sort((a, b) => b.id - a.id);

    // Function to handle the "View" button click
    const handleView = (row: any) => {
        setSelectedRow(row);
        setOpen(true);
        setActionButtonState(row.status);
    };

    // Function to close the modal
    const handleClose = () => {
        setOpen(false);
        setShowConfirmationRenewDialog(false); // Close confirmation dialog if open
        setShowConfirmationSuspendDialog(false); // Close confirmation dialog if open
    };

    // Function to handle the "Renew" button click
    const handleRenew = () => {
        setShowConfirmationRenewDialog(true); // Show confirmation dialog
    };

    // Function to confirm renewal
    const confirmRenewal = () => {
        // Perform the renew action here...
        console.log("Renew action confirmed");
        setShowConfirmationRenewDialog(false); // Close confirmation dialog
    };

    const handleSuspend = () => {
        setShowConfirmationSuspendDialog(true); // Show confirmation dialog
    };
    
    // Function to confirm suspension
    const confirmSuspend = () => {
        // Perform the suspend action here...
        console.log("Suspend action confirmed");
        setShowConfirmationSuspendDialog(false); // Close confirmation dialog
    };

    return (
        <>
            <Table>
                <TableHeadStyle>
                    <TableRow>
                        <TableCellStyle>Name</TableCellStyle>
                        <TableCellStyle>Course</TableCellStyle>
                        <TableCellStyle>Department</TableCellStyle>
                        <TableCellStyle>Contact</TableCellStyle>
                        <TableCellStyle>Contract Start</TableCellStyle>
                        <TableCellStyle>Contract End</TableCellStyle>
                        <TableCellStyle>Status</TableCellStyle>
                        <TableCellStyle>Action</TableCellStyle>
                    </TableRow>
                </TableHeadStyle>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCellStyleRow>{row.name}</TableCellStyleRow>
                            <TableCellStyleRow>{row.course}</TableCellStyleRow>
                            <TableCellStyleRow>{row.department}</TableCellStyleRow>
                            <TableCellStyleRow>{row.contact}</TableCellStyleRow>
                            <TableCellStyleRow>{formatDate(row.start)}</TableCellStyleRow>
                            <TableCellStyleRow>{formatDate(row.end)}</TableCellStyleRow>
                            <TableCellStyleRow style={{ color: getStatusColor(row.status) }}>{row.status}</TableCellStyleRow>
                            <TableCellStyleRow>
                                <Button variant="contained" color="primary" onClick={() => handleView(row)}>View</Button>
                            </TableCellStyleRow>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {open && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
                    <Paper sx={{ width: '95%', height: '70%', maxWidth: 1200, maxHeight: 600, overflow: 'auto', padding: '20px', position: 'relative' }}>

                    <DialogContent sx={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
                    {selectedRow && (
                        <>
                            <div>
                                <Avatar alt={selectedRow.name} src={selectedRow.avatar} sx={{ marginLeft: "30px" ,width: 200, height: 200 }} />
                                
                            </div>
                            <div>
                                <p style={{ fontSize: "1.5rem" }}><span style={{ fontSize: "2rem", fontWeight: "bold" }}>{selectedRow.name}</span>, <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>{selectedRow.age}</span></p>
                                <p style={{ fontSize: "1.5rem" }}><span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>{selectedRow.department}</span>, <span style={{ fontSize: "1.5rem", fontWeight: "normal" }}>{selectedRow.course}</span></p>
                                
                            </div>
                        </>
                    )}
                </DialogContent>
                <DialogContent sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
                    {selectedRow && (
                        <>
                            <div>
                                <p style={{  marginLeft: "30px" }}>Address:</p>
                                <p style={{  marginLeft: "30px" }}>Last School Attend: </p>
                                <p style={{  marginLeft: "30px" }}>Facebook Account: </p>
                                <p style={{  marginLeft: "30px" }}>Contact #: </p>
                                
                            </div>
                            <div>
                                <p>AAAAAAAAAAAAAAAAAAAA</p>
                                <p>AAAAAAAAAAAAAAAAAAA</p>
                                <p>AAAAAAAAAAAAAAAaA</p>
                                <p>AAAAAAAAAAAAAAA</p>
                            </div>
                            <div>
                                <p style={{  marginLeft: "30px" }}>Guardian Name: </p>
                                <p style={{  marginLeft: "30px" }}>Guardian Contact: </p>
                            </div>
                            <div>
                                <p>AAAAAAAAAAAAAAAAAAAAAA</p>
                                <p>AAAAAAAAAAAAAAAAA</p>
                            </div>
                            <div>
                                <p style={{  marginLeft: "120px" }}>Contract Start: </p>
                            </div>
                            <div>
                                <p>{formatDate(selectedRow.start)}</p>
                            </div>
                            <div>
                                <p style={{ marginLeft: "120px" }}>Contract End: </p>
                            </div>
                            <div>
                                <p >{formatDate(selectedRow.end)}</p>
                            </div>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                {actionButtonState === 'Pending' && (
                                <>
                                    <div>
                                    <Button variant="contained" sx={{ marginRight: 3}} color="primary" onClick={() => handleRenew()}>
                                        Renew
                                    </Button>
                                    <Button variant="contained" sx={{ marginRight: 3}} color="primary" onClick={() => console.log("Update Info")}>
                                        Update Info
                                    </Button>
                                    <Button variant="contained" sx={{ marginRight: 3}} color="error" onClick={() => handleSuspend()}>
                                        Suspend
                                    </Button>
                                    </div>
                                </>
                            )}
                            {actionButtonState === 'Renewed' && (
                                <>
                                <div>
                                    <Button variant="contained" sx={{ marginRight: 3}} disabled>
                                        Renew
                                    </Button>
                                    <Button variant="contained" sx={{ marginRight: 3}} color="primary" onClick={() => console.log("Update Info")}>
                                        Update Info
                                    </Button>
                                    <Button variant="contained" sx={{ marginRight: 3}} color="error" onClick={() => handleSuspend()}>
                                        Suspend
                                    </Button>
                                </div>
                                </>
                            )}
                            {actionButtonState === 'Suspended' && (
                                <>
                                  <div>
                                    <Button variant="contained" sx={{ marginRight: 3}} disabled >
                                        Renew
                                    </Button>
                                    <Button variant="contained" sx={{ marginRight: 3}} color="primary" onClick={() => console.log("Update Info")}>
                                        Update Info
                                    </Button>
                                    <Button variant="contained" sx={{ marginRight: 3}} disabled>
                                        Suspend
                                    </Button>
                                   </div>
                                </>
                            )}
                    <IconButton aria-label="close" color="primary" size="large" onClick={handleClose} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                </DialogActions>
            </Paper>
            </div>
            
            )}
            
            {/* Confirmation dialog */}
            <Dialog
                open={showConfirmationRenewDialog}
                onClose={() => setShowConfirmationRenewDialog(false)}
            >
                <DialogTitle>Confirm Renewal</DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <p>Are you sure you want to renew the working scholar from this list?</p>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <>
                    <div>
                    <Button variant="contained" sx={{ marginRight: 3}} onClick={confirmRenewal}>Yes</Button>
                    <Button variant="contained" color="error" sx={{ marginRight: 3}}  onClick={() => setShowConfirmationRenewDialog(false)}>No</Button>
                    </div>  
                    </>
                </DialogActions>
            </Dialog>
            {/* // Confirmation dialog for suspending */}
                <Dialog
                    open={showConfirmationSuspendDialog}
                    onClose={() => setShowConfirmationSuspendDialog(false)}
                >
                    <DialogTitle>Confirm Suspension</DialogTitle>
                    <DialogContent sx={{ justifyContent: 'center'}}>
                        {selectedRow && (
                            <p style={{ textAlign: 'center' }}>Suspending the working scholar will end his/her scholarship for good. Are you sure you want to suspend the working scholar: {selectedRow.name}?</p>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
                        <>
                        <div>
                        <Button variant="contained" sx={{ marginRight: 3}} onClick={confirmSuspend}>Yes</Button>
                        <Button variant="contained" color="error" sx={{ marginRight: 3}} onClick={() => setShowConfirmationSuspendDialog(false)}>No</Button>
                        </div>
                        </>
                    </DialogActions>
                </Dialog>
        </>
    );
}

export default MWSTable;
