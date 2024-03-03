import React from 'react';
import LoginImage from '../../assets/uclm-banner.jpg';
import { Stepper, Step, StepLabel, Button, Typography, Container, Paper, Box } from '@mui/material';

function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Basic Details', 'Profile Upload', 'Family Info'];

    // Function to handle moving to the next step
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // Function to handle moving back to the previous step
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Stepper component */}
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Conditional rendering based on active step */}
            {activeStep === steps.length ? (
                <React.Fragment>
                    {/* Completion message */}
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>

                    {/* Reset button */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={() => setActiveStep(0)}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/* Current step number
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                    {/* Navigation buttons */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {/* Back button (disabled if on the first step) */}
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        {/* Next button */}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

const Register: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div style={{backgroundColor: 'white', minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* Form container */}
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 2, borderRadius: '12px', backgroundColor: 'white'}}>
                    {/* Stepper component */}
                    <HorizontalLinearStepper />

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Form fields */}
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default Register;
