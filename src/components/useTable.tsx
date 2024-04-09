import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/system';

interface HeadCell {
    id: string;
    label: string;
}

interface Props {
    // Define any props you want to pass to the table
}

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

const useTable = (props: Props, headCells: HeadCell[]) => {
    const TblContainer = ({ children }: { children: React.ReactNode }) => (
        <Table {...props}>
            <TableHeadStyle>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCellStyle key={headCell.id}>
                            {headCell.label}
                        </TableCellStyle>
                    ))}
                </TableRow>
            </TableHeadStyle>
            <TableBody>
                {React.Children.map(children, (child) => (
                    <TableRow>
                        {React.Children.map(child, (cell, index) => (
                            <TableCellStyleRow key={index}>
                                {cell}
                            </TableCellStyleRow>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return {
        TblContainer,
        TableCellStyleRow // Expose TableCellStyleRow
    };
};

export default useTable;
