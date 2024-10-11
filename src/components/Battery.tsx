import React from 'react';
import { BatteryOutput } from 'zebar';
import './Battery.css';
import { motion } from 'framer-motion';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const msFormatted = (ms: number | null): string => {
  if (ms === null) return '';
  const totalSeconds = ms / 1000;
  const totalMinutes = totalSeconds / 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours.toString().padStart(2, '0')}:${Math.floor(totalMinutes % 60)
    .toString()
    .padStart(2, '0')}`;
};

const BatteryGraphic = React.memo(function BatteryGraphic({
  fill,
  charging,
}: {
  fill: number;
  charging: boolean;
}) {
  return (
    <div className="battery-graphic">
      <div className="battery-cap" />
      <div className="battery-body">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <motion.div
            animate={
              charging
                ? {
                    backgroundSize: ['100% 0%', '100% 100%', '100% 100%'],
                    backgroundImage: [
                      'linear-gradient(to top, #FFFFFFFF, #00000000)',
                      'linear-gradient(to top, #FFFFFFDD, #00000000)',
                      'linear-gradient(to top, #FFFF0000, #00000000)',
                    ],
                  }
                : {}
            }
            transition={charging ? { duration: 2, repeat: Infinity, times: [0, 0.5, 1] } : {}}
            className={`battery-fill ${charging ? 'animated' : ''}`}
            style={{
              height: `${clamp(fill, 0, 100)}%`,
              backgroundColor: `color-mix(in hsl decreasing hue, #00FF00 ${clamp(fill - 20, 0, 100)}%, #FF0000 ${clamp(120 - fill, 0, 100)}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
});

const BatteryComponent = React.memo(function Battery({
  battery,
  estimate,
}: {
  battery: BatteryOutput | null;
  estimate: number;
}) {
  // const [fill, setFill] = React.useState<number>(0);
  if (battery === null) return '';
  return (
    <div className="widget battery">
      <BatteryGraphic
        fill={Math.round(battery.chargePercent)}
        // fill={fill}
        charging={battery.isCharging}
      />
      <span style={{ whiteSpace: 'pre' }}>
        {Math.round(battery.chargePercent).toString().padStart(3, ' ')}%
      </span>
      {(battery.state === 'discharging' || battery.state === 'charging') && (
        <span style={{ whiteSpace: 'pre' }}>
          {' '}
          {battery.isCharging ? msFormatted(battery.timeTillFull) : msFormatted(estimate)}{' '}
        </span>
      )}
      {battery.isCharging && <div className="nerd-icon">󰚥</div>}
      {/* <input
         type="number"
         value={fill}
         onChange={(e) => {
           setFill(Number(e.target.value));
         }}
       ></input>*/}
    </div>
  );
});

export default BatteryComponent;
