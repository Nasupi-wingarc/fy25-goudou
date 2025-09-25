import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import TimetablePage from './pages/TimetablePage';

const theme = createTheme();

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('マイページ');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <UserInfo />
      <TimetablePage />
    </ThemeProvider>
  );
};

export default App;
