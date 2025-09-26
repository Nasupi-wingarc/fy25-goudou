import { useState } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
// import UserInfo from './components/UserInfo';
import TimetablePage from './pages/TimetablePage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import FlightStatusPage from './pages/FlightStatusPage';

interface Subject {
  name: string;
  isOnline?: boolean;
}

const theme = createTheme();

function App() {
  const [currentPage, setCurrentPage] = useState('マイページ');
  const [currentView, setCurrentView] = useState<'timetable' | 'video' | 'flight'>('timetable');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleSubjectClick = (subject: Subject) => {
    if (subject.isOnline) {
      setSelectedSubject(subject);
      setCurrentView('video');
    }
  };

  const handleBackToTimetable = () => {
    setCurrentView('timetable');
    setSelectedSubject(null);
  };

  const handleGoToTest = () => {
    // テストページへの遷移処理（必要に応じて実装）
    console.log('テストページへ移動');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (page === '欠航状況') {
      setCurrentView('flight');
    } else if (page === 'マイページ') {
      setCurrentView('timetable');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'video':
        return (
          <VideoPlayerPage
            subject={selectedSubject?.name || ''}
            onBack={handleBackToTimetable}
            onGoToTest={handleGoToTest}
          />
        );
      case 'flight':
        return <FlightStatusPage />;
      default:
        return <TimetablePage onSubjectClick={handleSubjectClick} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header currentPage={currentPage} setCurrentPage={handlePageChange} />
        <UserInfo />
        {renderCurrentView()}
      </Box>
    </ThemeProvider>
  );
}

export default App;
