import React, { useState } from 'react';
import { Box } from '@mui/material';
import DateNavigation from '../components/DateNavigation';
import TimetableGrid from '../components/TimetableGrid';

interface Subject {
  name: string;
  isOnline?: boolean;
}

interface TimetablePageProps {
  onSubjectClick: (subject: Subject) => void;
}

const TimetablePage: React.FC<TimetablePageProps> = ({ onSubjectClick }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  return (
    <Box>
      <DateNavigation 
        currentWeek={currentWeek} 
        onWeekChange={setCurrentWeek} 
      />
      <TimetableGrid 
        currentWeek={currentWeek} 
        onSubjectClick={onSubjectClick}
      />
    </Box>
  );
};

export default TimetablePage;
