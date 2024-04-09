import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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

const TableWSList: React.FC = () => {
    // Example data for the table
    const rows = [
        { id: 1, name: 'Item 1', quantity: 5, price: 10 },
        { id: 2, name: 'Item 2', quantity: 3, price: 15 },
        { id: 3, name: 'Item 3', quantity: 7, price: 20 },
    ];

    return (
        <Table>
            <TableHeadStyle>
                <TableRow>
                    <TableCellStyle>Item ID</TableCellStyle>
                    <TableCellStyle>Item Name</TableCellStyle>
                    <TableCellStyle>Quantity</TableCellStyle>
                    <TableCellStyle>Price</TableCellStyle>
                </TableRow>
            </TableHeadStyle>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCellStyleRow>{row.id}</TableCellStyleRow>
                        <TableCellStyleRow>{row.name}</TableCellStyleRow>
                        <TableCellStyleRow>{row.quantity}</TableCellStyleRow>
                        <TableCellStyleRow>{row.price}</TableCellStyleRow>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TableWSList;
