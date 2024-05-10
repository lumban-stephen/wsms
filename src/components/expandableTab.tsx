import { Paper, Typography, Box, Button, Collapse, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const ExpandableTab: React.FC<{ name: string }> = ({ name }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedPreferences, setSelectedPreferences] = useState<{ [key: string]: string }>({
        'Request Type': '',
        'Quantity': '',
        'Status': '',
        'Gender': '',
        'Course': ''
    });

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handlePreferenceChange = (preference: string, value: string) => {
        setSelectedPreferences({
            ...selectedPreferences,
            [preference]: value
        });
    };

    return (

        <Paper elevation={3} sx={{ p: 3, borderRadius: '20px', backgroundColor: 'White', width: '280px', minHeight: '3vh', position: 'absolute'}}>
            <Typography variant="h5" gutterBottom fontWeight='bold' style={{ textAlign: 'left'}}>{name}</Typography>
            <Button variant="outlined" onClick={toggleExpanded} style={{ marginBottom: '10px' }}>
                {expanded ? 'Hide Preferences' : 'Show Preferences'}
            </Button>
            <Collapse in={expanded}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography variant="body1" style={{ marginRight: '10px', width: '120px' }}>Request Type:</Typography>
                        <Select
                            value={selectedPreferences['Request Type']}
                            onChange={(event) => handlePreferenceChange('Request Type', event.target.value as string)}
                            variant="outlined"
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value="">Select Request Type</MenuItem>
                            <MenuItem value="additional">Additional</MenuItem>
                            <MenuItem value="replacement">Replacement</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography variant="body1" style={{ marginRight: '10px', width: '120px' }}>Quantity:</Typography>
                        <input
                            type="number"
                            value={selectedPreferences['Quantity']}
                            onChange={(event) => handlePreferenceChange('Quantity', event.target.value)}
                            style={{ width: '100%', padding: '5px' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography variant="body1" style={{ marginRight: '10px', width: '120px' }}>Status:</Typography>
                        <Select
                            value={selectedPreferences['Status']}
                            onChange={(event) => handlePreferenceChange('Status', event.target.value as string)}
                            variant="outlined"
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value="">Select Status</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="accepted">Accepted</MenuItem>
                            <MenuItem value="suspended">Suspended</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography variant="body1" style={{ marginRight: '10px', width: '120px' }}>Gender:</Typography>
                        <Select
                            value={selectedPreferences['Gender']}
                            onChange={(event) => handlePreferenceChange('Gender', event.target.value as string)}
                            variant="outlined"
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value="">Select Gender</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography variant="body1" style={{ marginRight: '10px', width: '120px' }}>Course:</Typography>
                        <Select
                            value={selectedPreferences['Course']}
                            onChange={(event) => handlePreferenceChange('Course', event.target.value as string)}
                            variant="outlined"
                            sx={{ width: '100%' }}
                        >
                            <MenuItem value="">Select Course</MenuItem>
                            <MenuItem value="BSCS">BSCS</MenuItem>
                            <MenuItem value="BSIT">BSIT</MenuItem>
                            <MenuItem value="BSCrim">BSCrim</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Collapse>
        </Paper>
    );
};

export default ExpandableTab;
