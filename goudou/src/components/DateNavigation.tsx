import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const DateNavigation: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Typography variant="h6">
        2021年12月12日 - 18日
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" size="small" sx={{ backgroundColor: '#9e9e9e' }}>
          今日
        </Button>
        <IconButton sx={{ backgroundColor: '#9e9e9e', color: 'white' }}>
          <ChevronLeft />
        </IconButton>
        <IconButton sx={{ backgroundColor: '#9e9e9e', color: 'white' }}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DateNavigation;
