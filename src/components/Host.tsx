import React from 'react';
import { HostOutput } from 'zebar';

const HostComponent = React.memo(function Host({ host }: { host: HostOutput | null }) {
  if (host === null) return '';
  return (
    <div className="widget host">
      {Math.floor(host.uptime / 86400000) > 0 && (
        <span>{Math.floor(host.uptime / (24 * 60 * 60 * 1000))} days</span>
      )}
      <span style={{ whiteSpace: 'pre' }}>
        {`${(Math.floor(host.uptime / (60 * 60 * 1000)) % 24).toString().padStart(2, ' ')}:${(
          Math.floor(host.uptime / (60 * 1000)) % 60
        )
          .toString()
          .padStart(2, '0')}`}
      </span>
      <div className="nerd-icon" style={{ fontSize: '1.2em' }}>
        {host.osName === 'Windows' && '󰖳'}
      </div>
    </div>
  );
});

export default HostComponent;
