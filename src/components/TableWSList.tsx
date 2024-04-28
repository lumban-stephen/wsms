import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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

const TableWSList: React.FC = () => {
    const [open, setOpen] = useState(false); // State to control the modal open/close
    const [selectedRow, setSelectedRow] = useState<any>(null); // State to store the selected row data

    // Example data for the table
    let rows = [
        { id: 1, name: 'Gregory House', course: 'BSCS', department: 'College of Computer Studies', contact: '09123456789', start: new Date(2024, 3, 28), end: new Date(2025, 3, 28), status: 'Renewed' },
        { id: 2, name: 'John Wick', course: 'BSA', department: 'College of Business and Accountancy', contact: '09876543210', start: new Date(2024, 2, 15), end: new Date(2025, 2, 15), status: 'Pending' },
        { id: 3, name: 'Bunta Fujiwara', course: 'BSMT', department: 'College of Marine Transportation', contact: '09121234567', start: new Date(2024, 1, 10), end: new Date(2025, 1, 10), status: 'Retired' },
        { id: 4, name: 'Ryo Saeba', course: 'BSIT', department: 'College of Computer Studies', contact: '09121234567', start: new Date(2024, 1, 10), end: new Date(2025, 1, 10), status: 'Suspended' },
    ];

    // Sort rows by ID in descending order
    rows.sort((a, b) => b.id - a.id);

    // Function to handle the "View" button click
    const handleView = (row: any) => {
        setSelectedRow(row);
        setOpen(true);
    };

    // Function to close the modal
    const handleClose = () => {
        setOpen(false);
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedRow?.name} Details</DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <>
                            <p>Course: {selectedRow.course}</p>
                            <p>Department: {selectedRow.department}</p>
                            <p>Contact: {selectedRow.contact}</p>
                            <p>Contract Start: {formatDate(selectedRow.start)}</p>
                            <p>Contract End: {formatDate(selectedRow.end)}</p>
                            <p>Status: {selectedRow.status}</p>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TableWSList;
