import './index.css';
import React from 'react';
import * as zebar from 'zebar';
import ReactDOM from 'react-dom/client';
import LPF from 'lpf';

import Spacer from './components/Spacer';
import DateComponent from './components/Date';
import ClockComponent from './components/Clock';
import GlazeWmComponent from './components/GlazeWM';
import NetworkComponent from './components/Network';
import MemoryComponent from './components/Memory';
import CPUComponent from './components/CPU';
import BatteryComponent from './components/Battery';
import HostComponent from './components/Host';

const providers = zebar.createProviderGroup({
  network: { type: 'network' },
  cpu: { type: 'cpu' },
  day: { type: 'date', formatting: 'ccc' },
  week: { type: 'date', formatting: 'WW' },
  date: { type: 'date', formatting: 'yyyy-MM-dd' },
  clock: { type: 'date', formatting: 'TT ZZZ' },
  battery: { type: 'battery', refreshInterval: 1000 },
  memory: { type: 'memory' },
  glazewm: { type: 'glazewm' },
  host: { type: 'host' },
});

function App() {
  const [output, setOutput] = React.useState(providers.outputMap);
  const [timeEstimateSeries, setTimeEstimateSeries] = React.useState<number[]>([]);

  const updateTimeEstimate = (newValue: number) => {
    setTimeEstimateSeries((current) => {
      if (current[0] && newValue === current[0]) return current;
      const copy = JSON.parse(JSON.stringify(current)) as number[];
      copy.unshift(newValue);
      while (copy.length > 100) {
        copy.pop();
      }
      LPF.smoothing = 0.75;
      LPF.smoothArray(copy);
      return copy;
    });
  };

  React.useEffect(() => {
    providers.onOutput((outputMap) => {
      setOutput(outputMap);
      if (outputMap.battery?.timeTillEmpty) updateTimeEstimate(outputMap.battery.timeTillEmpty);
    });
  }, []);

  const { week, day, date, clock, glazewm, network, memory, cpu, battery, host } = output;
  const batteryTimeEstimate =
    timeEstimateSeries.reduce((a, b) => a + b, 0) / timeEstimateSeries.length;

  return (
    <>
      <div className="left">
        <GlazeWmComponent glazewm={glazewm} />
        <Spacer />
      </div>

      <div className="center">
        <DateComponent day={day} week={week} date={date} />
        <ClockComponent clock={clock} />
        <NetworkComponent network={network} />
        <MemoryComponent memory={memory} />
        <CPUComponent cpu={cpu} />
        <BatteryComponent battery={battery} estimate={batteryTimeEstimate} />
      </div>

      <div className="right">
        <Spacer />
        <HostComponent host={host} />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
