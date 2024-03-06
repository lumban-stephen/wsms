import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

interface StepProgressBarProps {
  steps: string[];
  activeStep: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ steps, activeStep }) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.slice(0, -1).map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepProgressBar;
