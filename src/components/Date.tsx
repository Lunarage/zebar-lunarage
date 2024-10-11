import React from 'react';
import { DateOutput } from 'zebar';

const DateComponent = React.memo(function Date({
  day,
  week,
  date,
}: {
  day: DateOutput | null;
  week: DateOutput | null;
  date: DateOutput | null;
}) {
  if (day === null || week === null || date === null) return '';
  return (
    <div className="widget date">
      {day.formatted} ({week.formatted}) {date.formatted}
    </div>
  );
});

export default DateComponent;
