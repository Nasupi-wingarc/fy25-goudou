import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import ferryScheduleImage from '../assets/運航表.jpg';

interface FlightInfo {
  route: string;
  departure: string;
  arrival: string;
  status: 'normal' | 'cancelled' | 'delayed';
  reason?: string;
  ferry: string;
}

const FlightStatusPage: React.FC = () => {
  // 運航表に基づいた欠航情報
  const flightData: FlightInfo[] = [
    { route: '鹿児島 → 喜界', departure: '17:30', arrival: '20:30', status: 'normal', ferry: 'あまみ' },
    { route: '喜界 → 名瀬', departure: '21:00', arrival: '23:00', status: 'cancelled', reason: '天候不良', ferry: 'あまみ' },
    { route: '名瀬 → 古仁屋', departure: '07:00', arrival: '09:40', status: 'normal', ferry: 'あまみ' },
    { route: '古仁屋 → 平土野', departure: '10:00', arrival: '12:20', status: 'delayed', reason: '海上時化', ferry: 'あまみ' },
    { route: '平土野 → 鹿児島', departure: '12:50', arrival: '翌日06:30', status: 'normal', ferry: 'きかい' },
    { route: '鹿児島 → 名瀬', departure: '15:10', arrival: '17:50', status: 'cancelled', reason: '強風', ferry: 'きかい' },
    { route: '名瀬 → 喜界', departure: '18:20', arrival: '20:30', status: 'normal', ferry: 'きかい' },
    { route: '喜界 → 鹿児島', departure: '21:00', arrival: '翌日06:00', status: 'normal', ferry: 'きかい' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'cancelled': return 'error';
      case 'delayed': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '運航';
      case 'cancelled': return '欠航';
      case 'delayed': return '遅延';
      default: return '不明';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#333' }}>
        奄美海運 運航状況・欠航情報
      </Typography>
      
      {/* 運航表画像 */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>鹿児島-喜界-名瀬-古仁屋-平土野 運航表</Typography>
        <Paper sx={{ p: 2, display: 'inline-block', maxWidth: '100%' }}>
          <img 
            src={ferryScheduleImage}
            alt="奄美海運運航表" 
            style={{ 
              width: '100%', 
              height: 'auto',
              maxWidth: '800px'
            }} 
          />
        </Paper>
      </Box>

      {/* 欠航情報テーブル */}
      <Typography variant="h6" sx={{ mb: 2 }}>本日の運航状況</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>フェリー</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>航路</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>出発時刻</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>到着時刻</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>状況</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>理由</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightData.map((flight, index) => (
              <TableRow key={index}>
                <TableCell>{flight.ferry}</TableCell>
                <TableCell>{flight.route}</TableCell>
                <TableCell>{flight.departure}</TableCell>
                <TableCell>{flight.arrival}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusText(flight.status)} 
                    color={getStatusColor(flight.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{flight.reason || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#fff3cd', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: '#856404', mb: 1 }}>
          ※ 気象状況等により、奇港地の港変更や入出港の遅延、抜港（寄港不可）・欠航になる場合があります。
        </Typography>
        <Typography variant="body2" sx={{ color: '#856404' }}>
          ご利用の際は、弊社・各海運代理店へお問い合わせ下さい。
        </Typography>
      </Box>

      <Box sx={{ mt: 2, p: 2, backgroundColor: '#e8f4fd', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ color: '#0066cc', mb: 1 }}>
          奄美海運「F/あまみ・F/きかい」お問い合わせ
        </Typography>
        <Typography variant="body1" sx={{ color: '#0066cc', fontWeight: 'bold' }}>
          📞 099-222-2338
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
          営業時間：9:00~12:00, 13:00~16:00（土日祝日を除く）
        </Typography>
      </Box>
    </Box>
  );
};

export default FlightStatusPage;
