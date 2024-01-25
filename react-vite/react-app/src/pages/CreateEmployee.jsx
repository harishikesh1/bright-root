// Import necessary dependencies
import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Typography, Container, Paper, Box } from '@mui/material';
import Navbar from './Navbar'; 

// Define the steps for the form
const steps = ['Step 1', 'Step 2', 'Step 3'];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Define the form data state
  const [formData, setFormData] = useState({
    // Initialize form fields here
    field1: '',
    field2: '',
    field3: '',
  });

  // Function to handle next button click
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Function to handle back button click
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to handle form field changes
  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
  };

  return (
    <>

<Navbar />
    <Container>
      <h1 className="text-3xl font-bold underline bg-red-400">
      Hello world!
    </h1>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={3}>
          {activeStep === steps.length ? (
            // Display a success message or redirect after the last step
            <Typography variant="h5">Form submitted successfully!</Typography>
          ) : (
            // Display the current step's form fields
            <div>
              <Typography variant="h5">{steps[activeStep]}</Typography>
              <form>
                {/* Include form fields for the current step */}
                {activeStep === 0 && (
                  <div>
                    {/* Field 1 */}
                    <label>Field 1:</label>
                    <input
                      type="text"
                      value={formData.field1}
                      onChange={(e) => handleChange('field1', e.target.value)}
                    />
                  </div>
                )}

                {activeStep === 1 && (
                  <div>
                    {/* Field 2 */}
                    <label>Field 2:</label>
                    <input
                      type="text"
                      value={formData.field2}
                      onChange={(e) => handleChange('field2', e.target.value)}
                    />
                  </div>
                )}

                {activeStep === 2 && (
                  <div>
                    {/* Field 3 */}
                    <label>Field 3:</label>
                    <input
                      type="text"
                      value={formData.field3}
                      onChange={(e) => handleChange('field3', e.target.value)}
                    />
                  </div>
                )}

                <div style={{ marginTop: '20px' }}>
                  <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                    Back
                  </Button>

                  <Button variant="contained" color="primary" onClick={handleNext} style={{ marginLeft: '10px' }}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Box>
      </Paper>
      
    </Container>
    </>

  );
};

export default MultiStepForm;
