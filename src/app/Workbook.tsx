
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {connect} from 'react-redux';

const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  workbook: any;
  examples: any[];
  goals: any[];
  isOnline: any;
}

interface MyState {

}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    var {workbook} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
  }
  render () {
    var {workbook, isOnline, examples} = this.props;

    var offlineVideo = 'This video is not available while offline';

   
    return (
      <div>
          <h2>Examples</h2>
        {examples.map((item) => (
           <div key={'example_' + item.id}>{item.title}</div>
        ))}
      </div>
    );
  }
}

export default Workbook;
