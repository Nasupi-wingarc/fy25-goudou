import React from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

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
        <video
          width="100%"
          height="100%"
          controls
          style={{ objectFit: 'cover' }}
        >
          <source src="/src/assets/本能寺の変.mp4" type="video/mp4" />
          お使いのブラウザは動画タグに対応していません。
        </video>
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
