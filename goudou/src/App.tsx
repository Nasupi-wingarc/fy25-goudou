import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import TimetablePage from './pages/TimetablePage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import TestPage from './pages/TestPage';

interface Subject {
  name: string;
  isOnline?: boolean;
}

type PageMode = 'timetable' | 'video' | 'test';

const theme = createTheme();

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('マイページ');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [pageMode, setPageMode] = useState<PageMode>('timetable');

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setPageMode('video');
  };

  const handleBackToTimetable = () => {
    setSelectedSubject(null);
    setPageMode('timetable');
  };

  const handleGoToTest = () => {
    setPageMode('test');
  };

  const handleBackToVideo = () => {
    setPageMode('video');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {pageMode !== 'test' && (
        <>
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

        </>
      )}
      
      {pageMode === 'timetable' && (
        <TimetablePage onSubjectClick={handleSubjectClick} />
      )}
      
      {pageMode === 'video' && selectedSubject && (
        <VideoPlayerPage
          subject={selectedSubject.name}
          onBack={handleBackToTimetable}
          onGoToTest={handleGoToTest}
        />
      )}
      
      {pageMode === 'test' && selectedSubject && (
        <TestPage
          subject={selectedSubject.name}
          onBack={handleBackToVideo}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
