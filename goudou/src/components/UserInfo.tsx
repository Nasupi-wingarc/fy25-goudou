import React from 'react';
import { Box, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';

const UserInfo: React.FC = () => {
  return (
    <Box sx={{ p: 0, backgroundColor: '#0094ce' }}>
  <Typography variant="body2" sx={{ mb: 1 }}>
    ログイン中：3年1組 山田 太郎
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Language />
    <Typography variant="body2">：オンライン</Typography>
  </Box>
</Box>
  );
};

export default UserInfo;
