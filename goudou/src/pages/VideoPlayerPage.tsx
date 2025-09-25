import React from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { ArrowBack, PlayArrow } from '@mui/icons-material';

interface VideoPlayerPageProps {
  subject: string;
  onBack: () => void;
}

const VideoPlayerPage: React.FC<VideoPlayerPageProps> = ({ subject, onBack }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{ mb: 2, color: '#666' }}
      >
        戻る
      </Button>
      
      <Paper
        sx={{
          width: '100%',
          maxWidth: 800,
          height: 400,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px solid #ddd'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            <PlayArrow sx={{ fontSize: 40, color: 'white', ml: 1 }} />
          </Box>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          #14
        </Typography>
        <Chip label={subject} size="small" />
        <Chip label="遠隔授業" size="small" color="primary" />
      </Box>
    </Box>
  );
};

export default VideoPlayerPage;
