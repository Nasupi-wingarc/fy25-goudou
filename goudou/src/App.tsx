import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import TimetablePage from './pages/TimetablePage';
import VideoPlayerPage from './pages/VideoPlayerPage';

interface Subject {
  name: string;
  isOnline?: boolean;
}

const theme = createTheme();

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('マイページ');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleBackToTimetable = () => {
    setSelectedSubject(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <UserInfo />
      {selectedSubject ? (
        <VideoPlayerPage 
          subject={selectedSubject.name} 
          onBack={handleBackToTimetable}
        />
      ) : (
        <TimetablePage onSubjectClick={handleSubjectClick} />
      )}
    </ThemeProvider>
  );
};

export default App;
