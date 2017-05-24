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
    textAlign: 'center'
  },
  linkItem: {
    margin: '5px'
  }
};


interface Props {
  appBarTitle(msg: string): any;
}

interface State {
 
}

export default class Webinars extends React.Component<Props, State> {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Webinars');
  }

  render () {
    var {appBarTitle} = this.props;


    return (
        <div style={styles.container as any}>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p18q3afo3sn/">Making Time for Enjoyable Activities</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p3r437gwrkl/">Harnessing the Power of Your Mind</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p6hnn48yeu4/">Simple Strategies for Weight Maintenance</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p1eqzd8c6zb/">Simple Strategies for Better Sleep</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p1pdvdvuukg/">Be Kind to Yourself</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p66bbvuguj2/">Tobacco: Breaking the Habit</a>
          </div>
        </div>
    );
  }
}