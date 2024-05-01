import React, { useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
                <TableBody>
                <Box style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant='h6' fontWeight='bold'>Empty</Typography>
                            </Box>
                </TableBody>
            </Table>
        </>
    );
}

export default MWSTableEmpty;