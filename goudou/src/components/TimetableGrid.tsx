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
          <TableCell sx={{ width: 100, backgroundColor: '#003793', color: 'white' }}></TableCell>
          {weekDates.map((dayInfo) => (
            <TableCell
              key={dayInfo.fullDateString}
              align="center"
              sx={{
                backgroundColor: '#003793',
                color: 'white',
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
              <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>
                {time}
              </TableCell>
              {weekDates.map((dayInfo, dayIndex) => (
                <TableCell
                  key={`${time}-${dayInfo.dateString}`}
                  align="center"
                  sx={{
                    backgroundColor: dayInfo.dateString === todayString ? '#ffffbc' : 'white',
                    height: 60
                  }}
                >
                  {scheduleData[timeIndex]?.[dayIndex] && (
                    scheduleData[timeIndex][dayIndex]!.isOnline ? (
                      // オンラインの場合：ボタン（Chip）を表示
                      <Chip
                        icon={<Language />}
                        label={scheduleData[timeIndex][dayIndex]!.name}
                        size="small"
                        onClick={() => handleSubjectClick(scheduleData[timeIndex][dayIndex]!)}
                        sx={{
                          backgroundColor: '#e8f5e8',
                          borderRadius: 0,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#d4edda'
                          }
                        }}
                      />
                    ) : (
                      // オフラインの場合：テキストのみ表示（ボタンなし）
                      <span
                        onClick={() => handleSubjectClick(scheduleData[timeIndex][dayIndex]!)}
                        style={{
                          cursor: 'pointer',
                          color: '#666',
                          fontSize: '0.875rem'
                        }}
                      >
                        {scheduleData[timeIndex][dayIndex]!.name}
                      </span>
                    )
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
