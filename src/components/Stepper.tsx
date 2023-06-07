import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import UploadComponent from './upload/Upload.component'
import { useGetStudentsQuery } from '../services/students'

const steps = [
  'first file',
  'second file',
  'third file',
  'fourth file',
  'fifth file',
  'sixth file',
  'seventh file',
  'eighth file',
  'ninth file',
  'tenth file',
  'eleventh file',
]

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const isStepOptional = (step: number) => {
    return step === 111
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const renderUploadComponent = (stepIndex: number) => {
    return (
      <div key={stepIndex}>
        {activeStep === stepIndex && (
          <div>
            <h2>Upload {steps[stepIndex]}</h2>
            <UploadComponent />
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: 10 }}>Upload Assignments</h2>
      <Box
        sx={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 5,
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: { optional?: React.ReactNode } = {}
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              )
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button
                  color="inherit"
                  onClick={handleSkip}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  Skip
                </Button>
              )}
              <Button onClick={handleNext} sx={{ mr: 1 }} variant="contained">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
        {steps.map((_, index) => renderUploadComponent(index))}
      </Box>
    </div>
  )
}
