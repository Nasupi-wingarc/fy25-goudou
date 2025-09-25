import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const menuItems = ['マイページ', '授業登録', '連絡', '欠航状況'];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          {menuItems.map((item) => (
            <Button
              key={item}
              color="inherit"
              sx={{ 
                color: 'black', 
                mx: 2,
                fontWeight: currentPage === item ? 'bold' : 'normal'
              }}
              endIcon={<KeyboardArrowDown />}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
