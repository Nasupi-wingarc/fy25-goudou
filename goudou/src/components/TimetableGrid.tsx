import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { Language } from '@mui/icons-material';

interface Subject {
  name: string;
  isOnline?: boolean;
}

interface DateInfo {
  date: Date;
  dayName: string;
  dateString: string;
  fullDateString: string;
}

const getWeekDates = (baseDate: Date = new Date()): DateInfo[] => {
  const dates: DateInfo[] = [];
  const startOfWeek = new Date(baseDate);
  const dayOfWeek = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push({
      date: date,
      dayName: ['日', '月', '火', '水', '木', '金', '土'][i],
      dateString: `${date.getMonth() + 1}/${date.getDate()}`,
      fullDateString: `${date.getMonth() + 1}/${date.getDate()}(${['日', '月', '火', '水', '木', '金', '土'][i]})`
    });
  }
  return dates;
};

interface TimetableGridProps {
  currentWeek: Date;
  onSubjectClick: (subject: Subject) => void;
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ currentWeek, onSubjectClick }) => {
  const timeSlots = ['1限', '2限', '3限', '4限', '5限', '6限'];
  
  const weekDates = getWeekDates(currentWeek);
  const today = new Date();
  const todayString = `${today.getMonth() + 1}/${today.getDate()}`;

  const scheduleData: (Subject | null)[][] = [
    [null, { name: '現代文' }, { name: '科学' }, { name: '科学' }, { name: '英語' }, { name: '数学' }, null],
    [null, { name: '古文' }, { name: '数学' }, { name: '英語' }, { name: '科学' }, { name: '化学' }, null],
    [null, { name: '科学' }, { name: '日本史', isOnline: true }, { name: '科学' }, { name: '現代文' }, { name: '古文' }, null],
    [null, { name: '化学' }, { name: '現代文' }, { name: '体育' }, { name: '科学' }, { name: '科学' }, null],
    [null, { name: '日本史', isOnline: true }, null, null, null, { name: '英語' }, null],
    [null, null, { name: '現代文' }, { name: '体育' }, { name: '科学' }, null, null]
  ];

  const handleSubjectClick = (subject: Subject) => {
    if (subject.isOnline) {
      onSubjectClick(subject);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mx: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100, backgroundColor: '#f5f5f5' }}></TableCell>
            {weekDates.map((dayInfo) => (
              <TableCell 
                key={dayInfo.fullDateString} 
                align="center" 
                sx={{ 
                  backgroundColor: dayInfo.dateString === todayString ? '#fff3cd' : '#f5f5f5',
                  fontWeight: 'bold'
                }}
              >
                {dayInfo.fullDateString}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((time, timeIndex) => (
            <TableRow key={time}>
              <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                {time}
              </TableCell>
              {weekDates.map((dayInfo, dayIndex) => (
                <TableCell 
                  key={`${time}-${dayInfo.dateString}`} 
                  align="center"
                  sx={{ 
                    backgroundColor: dayInfo.dateString === todayString ? '#fff3cd' : 'white',
                    height: 60
                  }}
                >
                  {scheduleData[timeIndex] && scheduleData[timeIndex][dayIndex] && (
                    <Chip
                      icon={scheduleData[timeIndex][dayIndex]!.isOnline ? <Language /> : undefined}
                      label={scheduleData[timeIndex][dayIndex]!.name}
                      size="small"
                      onClick={() => handleSubjectClick(scheduleData[timeIndex][dayIndex]!)}
                      sx={{ 
                        backgroundColor: scheduleData[timeIndex][dayIndex]!.isOnline ? '#e8f5e8' : 'white',
                        border: scheduleData[timeIndex][dayIndex]!.isOnline ? 'none' : '1px solid #ccc',
                        cursor: scheduleData[timeIndex][dayIndex]!.isOnline ? 'pointer' : 'default',
                        '&:hover': scheduleData[timeIndex][dayIndex]!.isOnline ? {
                          backgroundColor: '#d4edda'
                        } : {}
                      }}
                    />
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
