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
  // 今日から7日間の日付を生成
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    dates.push({
      date: date,
      dayName: ['日', '月', '火', '水', '木', '金', '土'][date.getDay()],
      dateString: `${date.getMonth() + 1}/${date.getDate()}`,
      fullDateString: `${date.getMonth() + 1}/${date.getDate()}(${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]})`
    });
  }
  return dates;
};

// ランダムで授業を生成する関数
const generateRandomSchedule = (weekDates: DateInfo[]): (Subject | null)[][] => {
  const subjects = [
    { name: '現代文' },
    { name: '古文' },
    { name: '数学' },
    { name: '英語' },
    { name: '化学' },
    { name: '科学' },
    { name: '日本史', isOnline: true },
    { name: '体育' },
    { name: '物理' },
    { name: '生物' },
    { name: 'スキューバダイビング', isOnline: true }
  ];

  const timeSlots = 6;
  const schedule: (Subject | null)[][] = [];

  for (let timeIndex = 0; timeIndex < timeSlots; timeIndex++) {
    const timeSlot: (Subject | null)[] = [];
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayOfWeek = weekDates[dayIndex].date.getDay();
      
      // 土日（0: 日曜日, 6: 土曜日）は授業なし
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        timeSlot.push(null);
      } else {
        // 平日はすべての時限に授業を配置
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
        timeSlot.push(randomSubject);
      }
    }
    
    schedule.push(timeSlot);
  }

  return schedule;
};

interface TimetableGridProps {
  currentWeek: Date;
  onSubjectClick: (subject: Subject) => void;
}

const TimetableGrid: React.FC<TimetableGridProps> = ({ currentWeek, onSubjectClick }) => {
  const timeSlots = ['1限', '2限', '3限', '4限', '5限', '6限'];
  const weekDates = getWeekDates(currentWeek);
  
  // 週が変わるたびに新しいスケジュールを生成
  const scheduleData = React.useMemo(() => generateRandomSchedule(weekDates), [currentWeek]);

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
              {weekDates.map((dayInfo, dayIndex) => {
                // 土曜日（6）と日曜日（0）をチェック
                const isWeekend = dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 6;
                
                return (
                  <TableCell
                    key={`${time}-${dayInfo.dateString}`}
                    align="center"
                    sx={{
                      backgroundColor: isWeekend ? '#949393ff' : 'white',
                      height: 60
                    }}
                  >
                    {scheduleData[timeIndex]?.[dayIndex] && (
                      scheduleData[timeIndex][dayIndex]!.isOnline ? (
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
                        <span
                          onClick={() => handleSubjectClick(scheduleData[timeIndex][dayIndex]!)}
                          style={{
                            cursor: 'pointer',
                            color: isWeekend ? 'white' : '#666', // 土日は白文字、平日は元の色
                            fontSize: '0.875rem'
                          }}
                        >
                          {scheduleData[timeIndex][dayIndex]!.name}
                        </span>
                      )
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
    </Table>
  </TableContainer>
);
};

export default TimetableGrid;
