import React from 'react';
import { Box, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';

const UserInfo: React.FC = () => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        ログイン中：3年1組 山田 太郎
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Language />
        <Typography>：オンライン</Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
