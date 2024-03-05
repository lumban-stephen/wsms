import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stepper, Step, StepLabel, Button, Typography, Container, Paper, Box, TextField, Grid } from '@mui/material';
import './styles.css'; // Import custom CSS file for transitions
import Drop from '../../components/dropzone'
import StepProgressBar from '../../components/stepProgressBar';

const Register: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
    };

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Basic Details', 'Profile Upload', 'Family Info'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep < steps.length - 1) {
                return prevActiveStep + 1;
            } else {
                return prevActiveStep;
            }
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep > 0) {
                return prevActiveStep - 1;
            } else {
                return prevActiveStep;
            }
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div style={{ backgroundColor: '#dedede', minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth='lg'> {/*Set maxWidth to "lg" for wider container*/}
                <Paper elevation={22} sx={{ p: 2, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box sx={{width:'50%', mt: 5}}>
                        <StepProgressBar steps={steps} activeStep={activeStep} /> {/* Changed */}
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 5}}>           
                        <Box sx={{width: '80%'}}>
                            {/* Separate sets of input fields for each step */}
                            <div className={`step ${activeStep === 0 ? 'active' : ''}`}>
                                <Grid container spacing={15} alignItems={'center'}>
                                    {/* Left inputs */}
                                    <Grid item xs={6}>
                                        <TextField label="Complete Name*" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Address*" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Current Course*" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Contact Number*" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        {/* Add more left inputs here */}
                                    </Grid>
                                    {/* Right inputs */}
                                    <Grid item xs={6}>
                                        <TextField label="Gender" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Age" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Last School Attended" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Facebook Account/Link" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        {/* Add more right inputs here */}
                                    </Grid>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent:'space-between', width:'100%'}}> {/*back button*/}
                                        <Typography sx={{ mt: 2, textAlign: 'center', paddingLeft:'10px'}}>
                                            Already have an account? <a href="login" color='#00c0fe'>Login here</a>
                                        </Typography>
                                        <Button
                                            onClick={handleNext}
                                            sx={{ backgroundColor: '#0092dc', color: 'Black' }} // Set blue background color and white text color
                                            >
                                            {activeStep === steps.length - 1 ? 'Finish': 'Next'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </div>
                            <div className={`step ${activeStep === 1 ?'active' : ''}`}>
                                <Grid container spacing={6} alignItems={'center'} mt={0.2} display={'flex'} justifyContent={'center'}>
                                    <Grid item xs={6}>
                                        <Drop></Drop>
                                    </Grid>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%'}}> {/*back button*/}
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1, 
                                            backgroundColor: '#818181',
                                            color: 'white'}}>Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button
                                            onClick={handleNext}
                                            sx={{ backgroundColor: '#0092dc', color: 'Black' }} // Set blue background color and white text color
                                            >
                                            {activeStep === steps.length - 1 ? 'Finish': 'Next'}
                                        </Button>
                                    </Box>         
                                </Grid>
                            </div>
                            <div className={`step ${activeStep === 2 ?'active' : ''}`}>
                                <Grid container spacing={6} alignItems={'center'}>
                                    <Grid item xs={6}>
                                        <TextField label="Mother's Name" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Occupation*" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Father's Name" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Occupation*" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Guardian's Name" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Contact Number" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Guardian's Facebook Account/Link" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                    </Grid>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%'}}> {/*back button*/}
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1, 
                                            backgroundColor: '#818181',
                                            color: 'white'}}>Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button
                                            onClick={handleNext}
                                            sx={{ backgroundColor: '#0092dc', color: 'Black' }} // Set blue background color and white text color
                                            >
                                            {activeStep === steps.length - 1 ? 'Finish': 'Next'}
                                        </Button>
                                    </Box>         
                                </Grid>
                            </div>                                                       
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}

export default Register;
