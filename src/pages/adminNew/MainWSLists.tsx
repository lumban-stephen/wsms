import React from 'react';
import Paper from '@mui/material/Paper';
import useTable from "../../components/useTable";
import { styled } from '@mui/system';
import { TableCell, TableRow } from '@mui/material';

interface RowData {
    name: string;
    course: string;
    department: string;
    contact: string;
    constart: string;
    conend: string;
    status: string;
    [key: string]: string; // Allow other string keys (e.g., action) 
}

const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'course', label: 'Course' },
    { id: 'department', label: 'Department' },
    { id: 'contact', label: 'Contact' },
    { id: 'constart', label: 'Contract Start' },
    { id: 'conend', label: 'Contract End' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' },
    // Add more head cells as needed
];

const rows: RowData[] = [
    { name: 'Gregory House', course: 'Computer Science', department: 'College of Computer Studies', contact: '09123456789', constart: 'Apr 12, 2022', conend: 'Dec 24, 2024', status: 'Retire' }
];

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

export default function MainWSLists() {
    const { TblContainer, TableCellStyleRow } = useTable({}, headCells);

    return (
        <StyledPaper elevation={24}>
            <TblContainer>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        {headCells.map(cell => (
                            <TableCellStyleRow key={cell.id}>{row[cell.id as keyof RowData]}</TableCellStyleRow>
                        ))}
                    </TableRow>
                ))}
            </TblContainer>
        </StyledPaper>
    );
}
