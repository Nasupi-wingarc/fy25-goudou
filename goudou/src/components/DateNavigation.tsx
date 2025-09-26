import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

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

const formatDateRange = (dates: DateInfo[]): string => {
  const start = dates[0].date;
  const end = dates[6].date;
  
  // 開始日と終了日が同じ月の場合
  if (start.getMonth() === end.getMonth()) {
    return `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日 - ${end.getDate()}日`;
  }
  // 異なる月の場合
  else {
    return `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日 - ${end.getMonth() + 1}月${end.getDate()}日`;
  }
};

interface DateNavigationProps {
  currentWeek: Date;
  onWeekChange: (date: Date) => void;
}

const DateNavigation: React.FC<DateNavigationProps> = ({ currentWeek, onWeekChange }) => {
  const weekDates = getWeekDates(currentWeek);
  const dateRangeString = formatDateRange(weekDates);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    onWeekChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    onWeekChange(newDate);
  };

  const goToToday = () => {
    onWeekChange(new Date());
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button 
          variant="contained" 
          size="small" 
          sx={{ backgroundColor: '#9e9e9e' }}
          onClick={goToToday}
        >
          今日
        </Button>
        <IconButton 
          sx={{ backgroundColor: '#9e9e9e', color: 'white' }}
          onClick={goToPreviousWeek}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton 
          sx={{ backgroundColor: '#9e9e9e', color: 'white' }}
          onClick={goToNextWeek}
        >
          <ChevronRight />
        </IconButton>
      </Box>
      <Typography variant="h6">
        {dateRangeString}
      </Typography>
    </Box>
  );
};

export default DateNavigation;
