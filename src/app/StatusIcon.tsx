import * as React from 'react';
import * as ReactDOM from 'react-dom';

import DeviceSignalCellular0Bar from 'material-ui/svg-icons/device/signal-cellular-0-bar';
import DeviceSignalCellular2Bar from 'material-ui/svg-icons/device/signal-cellular-2-bar';
import DeviceSignalCellular4Bar from 'material-ui/svg-icons/device/signal-cellular-4-bar';

const StatusIcon = ({onlineStatus}) => {
  var cellIcon = <DeviceSignalCellular2Bar />;
  var message = 'unknown';
  switch (onlineStatus) {
    case 1:
      cellIcon = <DeviceSignalCellular4Bar  />;
      message = 'online';
      break;
    default:
      cellIcon = <DeviceSignalCellular0Bar />;
      message = 'offline';
  }

  return (
    <div style={{marginTop: '12px'}}>
      {cellIcon} <span>{message}</span>
    </div>
  );
};

export default StatusIcon;
