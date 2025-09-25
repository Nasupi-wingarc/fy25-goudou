import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { Language } from '@mui/icons-material';

const TimetableGrid: React.FC = () => {
  const timeSlots = ['6時間', '7時間', '8時間', '9時間', '10時間', '11時間', '12時間', '13時間', '14時間', '15時間', '16時間', '17時間', '18時間', '19時間', '20時間'];
  
  const days = [
    '12/12(日)',
    '12/13(月)',
    '12/14(火)',
    '12/15(水)',
    '12/16(木)',
    '12/17(金)',
    '12/18(土)'
  ];

  const scheduleData = [
    ['', '現代文', '科学', '科学', '英語', '数学', ''],
    ['', '古文', '数学', '英語', '科学', '化学', ''],
    ['', '科学', '日本史', '科学', '現代文', '古文', ''],
    ['', '化学', '現代文', '体育', '科学', '科学', ''],
    ['', '日本史', '', '', '', '英語', '']
  ];

  return (
    <TableContainer component={Paper} sx={{ mx: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100, backgroundColor: '#f5f5f5' }}></TableCell>
            {days.map((day) => (
              <TableCell 
                key={day} 
                align="center" 
                sx={{ 
                  backgroundColor: day === '12/14(火)' ? '#fff3cd' : '#f5f5f5',
                  fontWeight: 'bold'
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((time, index) => (
            <TableRow key={time}>
              <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                {time}
              </TableCell>
              {days.map((day, dayIndex) => (
                <TableCell 
                  key={`${time}-${day}`} 
                  align="center"
                  sx={{ 
                    backgroundColor: day === '12/14(火)' ? '#fff3cd' : 'white',
                    height: 60
                  }}
                >
                  {index < scheduleData.length && scheduleData[index][dayIndex] && (
                    <>
                      {scheduleData[index][dayIndex] === '日本史' ? (
                        <Chip
                          icon={<Language />}
                          label="日本史"
                          size="small"
                          sx={{ backgroundColor: '#e8f5e8' }}
                        />
                      ) : scheduleData[index][dayIndex] === '数学' && dayIndex === 1 ? (
                        <Chip
                          label="数学"
                          size="small"
                          sx={{ 
                            backgroundColor: 'white', 
                            border: '2px solid #ccc',
                            boxShadow: 2
                          }}
                        />
                      ) : scheduleData[index][dayIndex] === '化学' && dayIndex === 0 ? (
                        <Chip
                          label="化学"
                          size="small"
                          sx={{ 
                            backgroundColor: 'white', 
                            border: '2px solid #ccc',
                            boxShadow: 2
                          }}
                        />
                      ) : (
                        <Chip
                          label={scheduleData[index][dayIndex]}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimetableGrid;
