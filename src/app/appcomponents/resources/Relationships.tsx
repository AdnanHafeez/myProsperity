import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  },
  gridTile: {

  },
  container: {
    display: 'block'
  }
};


interface Props {
  appBarTitle(msg: string): any;
}

interface State {
 
}

export default class Relationships extends React.Component<Props, State> {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Relationships');
  }

  render () {
    var {appBarTitle} = this.props;


    return (
        <div style={styles.container as any}>
          <h2>Coming Soon</h2>

        </div>
    );
  }
}