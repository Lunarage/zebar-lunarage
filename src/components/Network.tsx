import React from 'react';
import { NetworkOutput } from 'zebar';

// Get icon to show for current network status.
function getNetworkIcon({ defaultGateway, defaultInterface }: NetworkOutput) {
  switch (defaultInterface?.type) {
    case 'ethernet':
      return '󰈀';
    case 'wifi':
      if (
        defaultGateway === null ||
        defaultGateway === undefined ||
        defaultGateway.signalStrength === null
      ) {
        return '󰤯';
      } else if (defaultGateway.signalStrength >= 80) {
        return '󰤨';
      } else if (defaultGateway.signalStrength >= 65) {
        return '󰤥';
      } else if (defaultGateway.signalStrength >= 40) {
        return '󰤢';
      } else if (defaultGateway.signalStrength >= 25) {
        return '󰤟';
      } else {
        return '󰤯';
      }
    default:
      return '󰤮';
  }
}

const NetworkComponent = React.memo(function Network({
  network,
}: {
  network: NetworkOutput | null;
}) {
  if (network === null) return '';
  return (
    <div className="widget network">
      {network && (
        <>
          <div className="nerd-icon">{getNetworkIcon(network)}</div>
          {network.defaultInterface?.type === 'wifi' && <span>{network.defaultGateway?.ssid}</span>}
          <span style={{ paddingLeft: '0.5em' }}>{network.defaultInterface?.ipv4Addresses[0]}</span>
        </>
      )}
    </div>
  );
});

export default NetworkComponent;
