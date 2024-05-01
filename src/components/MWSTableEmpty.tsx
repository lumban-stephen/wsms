import React, { useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell } from '@mui/material';
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



const MWSTableEmpty: React.FC = () => {


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
            </Table>
            <Box style={{ flex: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h6' fontWeight='bold'>Empty Record</Typography>
            </Box>
        </>
    );
}

export default MWSTableEmpty;