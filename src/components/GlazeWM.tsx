import React from 'react';
import { GlazeWmOutput } from 'zebar';

const GlazeWmComponent = React.memo(function GlazeWM({
  glazewm,
}: {
  glazewm: GlazeWmOutput | null;
}) {
  if (glazewm === null) return '';
  const { currentWorkspaces, bindingModes, tilingDirection, runCommand } = glazewm;
  return (
    <>
      <div className="widget workspaces">
        {currentWorkspaces.map((workspace) => (
          <button
            className={`
              workspace
              ${workspace.hasFocus && 'focused'} 
              ${workspace.isDisplayed && 'displayed'}
            `}
            onClick={() => runCommand(`focus --workspace ${workspace.name}`)}
            key={workspace.name}
          >
            {workspace.displayName ?? workspace.name}
          </button>
        ))}
      </div>
      {bindingModes.length > 0 && (
        <div className="widget binding">
          {bindingModes.map((bindingMode) => (
            <div className="binding-mode" key={bindingMode.name}>
              {bindingMode.displayName ?? bindingMode.name}
            </div>
          ))}
        </div>
      )}
      <div className="widget tiling">
        <button className="tiling-direction" onClick={() => runCommand('toggle-tiling-direction')}>
          {tilingDirection === 'horizontal' && '󰯍'}
          {tilingDirection === 'vertical' && '󰯎'}
        </button>
      </div>
    </>
  );
});

export default GlazeWmComponent;
