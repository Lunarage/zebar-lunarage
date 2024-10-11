import React from 'react';
import { DateOutput } from 'zebar';

const ClockComponent = React.memo(function Clock({ clock }: { clock: DateOutput | null }) {
  if (clock === null) return '';
  return <div className="widget clock">{clock.formatted}</div>;
});

export default ClockComponent;
