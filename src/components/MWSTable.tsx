import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import PaperDialog from '../components/MWSDialogPaperView';
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
    const [openDialog, setOpenDialog] = useState(false); // State to control the dialog open/close

    // Example data for the table
    const rows = [
        { id: 1, name: 'Gregory House', age: '21y', course: 'BSCS', department: 'College of Computer Studies', contact: '09123456789', start: new Date(2024, 3, 28), end: new Date(2025, 3, 28), status: 'Renewed' },
        { id: 2, name: 'John Wick', age: '21y', course: 'BSA', department: 'College of Business and Accountancy', contact: '09876543210', start: new Date(2024, 2, 15), end: new Date(2025, 2, 15), status: 'Pending' },
        { id: 3, name: 'Bunta Fujiwara', age: '21y', course: 'BSMT', department: 'College of Marine Transportation', contact: '09121234567', start: new Date(2024, 1, 10), end: new Date(2025, 1, 10), status: 'Retired' },
        { id: 4, name: 'Ryo Saeba', age: '21y', course: 'BSIT', department: 'College of Computer Studies', contact: '09121234567', start: new Date(2024, 1, 10), end: new Date(2025, 1, 10), status: 'Suspended' },
    ];

    // Function to handle the "View" button click
    const handleView = (row: any) => {
        setSelectedRow(row);
        setOpenDialog(true); // Open the dialog
    };

    // Function to close the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
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
            {/* Render the PaperDialog component */}
            <PaperDialog
                open={openDialog}
                onClose={handleCloseDialog}
                row={selectedRow}
            />
        </>
    );
}

export default MWSTable;
