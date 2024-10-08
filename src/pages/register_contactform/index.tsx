import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Stepper, Step, StepLabel, Button, Typography, Container, Paper, Box, TextField, Grid, InputLabel, Select, MenuItem } from '@mui/material';
import './styles.css'; // Import custom CSS file for transitions
import Drop from '../../components/dropzone'
import StepProgressBar from '../../components/stepProgressBar';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [completeName, setCompleteName] = useState('');
    const [address, setAddress] = useState('');
    const [currentCourse, setCurrentCourse] = useState('');
    const [currentNumber, setCurrentNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState();
    const [school, setSchool] = useState('');
    const [userFB, setUserFB] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [fathersOccupation, setFathersOccupation] = useState('');
    const [motherName, setMotherName] = useState('');
    const [mothersOccupation, setMothersOccupation] = useState('');
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' }); // Full month name
    const year = currentDate.getFullYear();

    const navigate = useNavigate();
    const isNextDisabledStep1 = completeName.trim() === ''|| address.trim() === ''|| currentCourse.trim() === ''|| currentNumber.trim() === '';
    const isNextDisabledStep3 = fathersOccupation.trim() === ''|| mothersOccupation.trim() === '';
    
    const handleSubmit = async () => {
        const workingScholarData = {
          completeName,
          address,
          currentCourse,
          currentNumber,
          gender,
          age,
          school,
          userFB,
          fatherName,
          fathersOccupation,
          motherName,
          mothersOccupation,
        };
    
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(workingScholarData),
          });
    
          const data = await response.json();

          if (response.ok) {
            navigate('/signup');
          } else {
            console.error('Error registering working scholar:', await response.text());
            // Handle registration errors (e.g., display error message)
          }
        } catch (error) {
          console.error('Error registering working scholar:', error);
          // Handle network or other errors
        }
    };

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Basic Details', 'Profile Upload', 'Family Info', 'Confirmation'];

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
    return (
        <div style={{ backgroundColor: '#dedede', minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth='lg'> {/*Set maxWidth to "lg" for wider container*/}
                <Paper elevation={22} sx={{ p: 2, borderRadius: '20px', backgroundColor: 'White', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {activeStep < steps.length - 1 && ( //StepBar UI disappears on the last index 'Confirmation'
                    <Box sx={{width:'50%', mt: 5}}>
                        <StepProgressBar steps={steps} activeStep={activeStep} />
                    </Box>
                    )}
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 5}}>           
                        <Box sx={{width: '80%'}}>
                            {/* Separate sets of input fields for each step */}
                            <div className={`step ${activeStep === 0 ? 'active' : ''}`}>
                                <Grid container spacing={15} alignItems={'center'}>
                                    {/* Left inputs */}
                                    <Grid item xs={6}>
                                        <TextField 
                                        label="Complete Name*" 
                                        fullWidth margin="normal" 
                                        variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} 
                                        value={completeName}
                                        onChange={(e) => setCompleteName(e.target.value)}/>         

                                        <TextField 
                                        label="Address*" 
                                        fullWidth margin="normal" 
                                        variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }} 
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}/>

                                        <TextField 
                                        label="Current Course*" 
                                        fullWidth margin="normal" 
                                        variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }} 
                                        value={currentCourse}
                                        onChange={(e) => setCurrentCourse(e.target.value)}/>

                                        <TextField 
                                        label="Contact Number*" 
                                        fullWidth margin="normal" 
                                        variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }}
                                        value={currentNumber}
                                        onChange={(e) => setCurrentNumber(e.target.value)}/>

                                    </Grid>
                                    {/* Right inputs */}
                                    <Grid item xs={6}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) => setGender(e.target.value)}
                                        >
                                            <MenuItem value={10}>Male</MenuItem>
                                            <MenuItem value={20}>Female</MenuItem>
                                        </Select>
                                        <TextField label="Age" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Last School Attended" value={school} onChange={(e) => setSchool(e.target.value)} fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Facebook Account/Link" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        {/* Add more right inputs here */}
                                    </Grid>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent:'space-between', width:'100%'}}> {/*back button*/}
                                        <Typography sx={{ mt: 2, textAlign: 'center', paddingLeft:'120px'}}>
                                            Already a Working Scholar? <a href="/login" color='#00c0fe'>Login here</a>
                                        </Typography>
                                        <Button
                                            onClick={handleNext}
                                            disabled={isNextDisabledStep1}
                                            sx={{ backgroundColor: '#0092dc', color: 'white', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)', paddingLeft: 5,
                                            paddingRight: 5, paddingTop: -1}} // Set blue background color and white text color
                                            >
                                            {activeStep === steps.length - 1 ? 'Finish': 'Next'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </div>
                            <div className={`step ${activeStep === 1 ?'active' : ''}`}>
                                <Grid container spacing={6} alignItems={'center'} mt={0.3} display={'flex'} justifyContent={'center'}>
                                    <Grid item xs={6}>
                                        <Drop></Drop>
                                    </Grid>                                    
                                </Grid>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%'}}> {/*back button*/}
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1, 
                                            backgroundColor: '#818181',
                                            color: 'white',
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)',
                                            paddingLeft: 5,
                                            paddingRight: 5,}}>Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button
                                            onClick={handleNext}
                                            sx={{ backgroundColor: '#0092dc', color: 'white', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)', paddingLeft: 5,
                                            paddingRight: 5}} // Set blue background color and white text color
                                            >
                                            {activeStep === steps.length - 1 ? 'Finish': 'Next'}
                                        </Button>
                                    </Box>         
                            </div>
                            <div className={`step ${activeStep === 2 ?'active' : ''}`}>                                 
                                <Grid container spacing={6} alignItems={'center'} display={'flex'} justifyContent={'center'} pt={0.3}>
                                    <Grid item xs={6}>
                                        <TextField 
                                        label="Mother's Name" 
                                        fullWidth margin="normal" variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }}/>
                                        
                                        <TextField 
                                        label="Occupation*" 
                                        fullWidth margin="normal" 
                                        variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }}
                                        value={mothersOccupation}
                                        onChange={(e) => setMothersOccupation(e.target.value)}/>

                                        <TextField label="Father's Name" 
                                        fullWidth margin="normal" 
                                        variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }}/>

                                        <TextField 
                                        label="Occupation*" 
                                        fullWidth margin="normal" 
                                        variant="standard" 
                                        inputProps={{ style: { borderBottom: '1px solid black' } }}
                                        value={fathersOccupation}
                                        onChange={(e) => setFathersOccupation(e.target.value)}/>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Guardian's Name" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Contact Number" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                        <TextField label="Guardian's Facebook Account/Link" fullWidth margin="normal" variant="standard" inputProps={{ style: { borderBottom: '1px solid black' } }} />
                                    </Grid>                                                               
                                </Grid>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%'}}> {/*back button*/}
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1, 
                                            backgroundColor: '#818181',
                                            color: 'white',
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)'}}>Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button
                                            onClick={handleNext}
                                            disabled={isNextDisabledStep3}
                                            sx={{ backgroundColor: '#0092dc', color: 'white', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)', paddingLeft: 5,
                                            paddingRight: 5}} // Set blue background color and white text color
                                            >
                                            {activeStep === steps.length - 1 ? 'Finish': 'Sumbit'}
                                        </Button>
                                    </Box>     
                            </div>
                            <div className={`step ${activeStep === 3 ? 'active' : ''}`}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, width:'100%', pb:3}}>
                                <Typography sx={{ textAlign: 'left' }}>
                                    I <span style={{ color: '#0092dc' }}>{completeName}</span> on this{' '}
                                    <span style={{ color: '#0092dc' }}>{day}</span>{' '}
                                    of <span style={{ color: '#0092dc' }}>{month}</span>,{' '}
                                    <span style={{ color: '#0092dc' }}>{year}</span>
                                    , hereby state that the aforementioned information is true and correct to the best of my knowledge and such failure to comply all the necessary requirements on the given period of time shall be the ground for the invalidator of my application.
                                    <br />
                                    The information herein shall be treated with utmost confidentiality and shall be used for scholastic purpose only. <br />
                                    No information herein shall be given out or used (other than the indicated purpose) without my written consent and permission to the Data Privacy Act of 2012 (R.A No. 10173) and its Implementing Rules and Regulations, as well as the pertinent Circulars of the National Privacy Commission.
                                </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', pt: 2, width:'100%', justifyContent:'center'}}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1, 
                                        backgroundColor: '#818181',
                                        color: 'white',
                                        marginRight: 5,
                                        paddingLeft: 7,
                                        paddingRight: 7,
                                        paddingTop: 1.5,
                                        paddingBottom: 1.5,
                                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)'}}>
                                        {activeStep == steps.length - 1? 'Decline': 'Back'}
                                    </Button>    
                                    <Button
                                        onClick={() => (activeStep === steps.length - 1 ? handleSubmit() : handleNext())} // Ternary operator for conditional function calls
                                        sx={{
                                            backgroundColor: '#0092dc',
                                            color: 'white',
                                            marginLeft: 5,
                                            paddingLeft: 7,
                                            paddingRight: 7,
                                            paddingTop: 1.5,
                                            paddingBottom: 1.5,
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.50)',
                                        }}
                                        >
                                        {activeStep === steps.length - 1 ? 'Agree' : 'Next'}
                                    </Button>
                                </Box>
                            </div>                                                       
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}
export default Register;