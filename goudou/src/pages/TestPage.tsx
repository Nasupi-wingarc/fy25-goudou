import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl 
} from '@mui/material';

interface TestPageProps {
  subject: string;
  onBack: () => void;
}

interface Question {
  id: string;
  title: string;
  options: string[];
}

interface Answers {
  question1: string;
  question2: string;
}

const TestPage: React.FC<TestPageProps> = ({ subject, onBack }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({
    question1: '',
    question2: ''
  });

  const questions: Question[] = [
    {
      id: 'question1',
      title: '本能寺の変が起こったのは何年ですか？',
      options: [
        '1580年',
        '1582年',
        '1584年',
        '1586年'
      ]
    },
    {
      id: 'question2',
      title: '本能寺の変で討たれたのは誰ですか？',
      options: [
        '織田信長',
        '豊臣秀吉',
        '徳川家康',
        '明智光秀'
      ]
    }
  ];

  const steps: string[] = ['問題1', '問題2'];

  const handleAnswerChange = (questionId: keyof Answers, value: string): void => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = (): void => {
    if (activeStep < questions.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevious = (): void => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = (): void => {
    console.log('回答:', answers);
    onBack();
  };

  const currentQuestion = questions[activeStep];
  const isLastStep = activeStep === questions.length - 1;
  const canProceed = answers[currentQuestion.id as keyof Answers] !== '';

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {subject} 小テスト
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {currentQuestion.title}
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={answers[currentQuestion.id as keyof Answers]}
              onChange={(e) => handleAnswerChange(currentQuestion.id as keyof Answers, e.target.value)}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handlePrevious}
          >
            前の問題
          </Button>

          {isLastStep ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canProceed}
              sx={{ backgroundColor: '#1976d2' }}
            >
              送信
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceed}
              sx={{ backgroundColor: '#1976d2' }}
            >
              次の問題
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TestPage;
