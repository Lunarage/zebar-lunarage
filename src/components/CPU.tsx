import React from 'react';
import { CpuOutput } from 'zebar';

const CPUComponent = React.memo(function CPU({ cpu }: { cpu: CpuOutput | null }) {
  if (cpu === null) return '';
  const highUse = cpu.usage > 85;
  return (
    <div className="widget cpu">
      <>
        <div className={`nerd-icon ${highUse ? 'high-usage' : ''}`}></div>
        <span style={{ whiteSpace: 'pre' }}>
          {Math.round(cpu.usage).toString().padStart(3, ' ')}%
        </span>
      </>
    </div>
  );
});

export default CPUComponent;
