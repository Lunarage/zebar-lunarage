import React from 'react';
import { MemoryOutput } from 'zebar';

const MemoryComponent = React.memo(function Memory({ memory }: { memory: MemoryOutput | null }) {
  if (memory === null) return '';
  const highUse = memory.usage > 90;
  return (
    <div className="widget memory">
      <>
        <div className={`nerd-icon ${highUse ? 'high-usage' : ''}`} style={{ fontSize: '1.2em' }}>
          󰘚
        </div>
        <span style={{ whiteSpace: 'pre' }}>
          {Math.round(memory.usage).toString().padStart(3, ' ')}%
        </span>
      </>
    </div>
  );
});

export default MemoryComponent;
