import React from 'react';
import { Box } from '@mui/material';
import DateNavigation from '../components/DateNavigation';
import TimetableGrid from '../components/TimetableGrid';

const TimetablePage: React.FC = () => {
  return (
    <Box>
      <DateNavigation />
      <TimetableGrid />
    </Box>
  );
};

export default TimetablePage;
