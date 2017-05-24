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
            <a target="_blank" href="http://dcoe.adobeconnect.com/p18q3afo3sn/">http://dcoe.adobeconnect.com/p18q3afo3sn/</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p3r437gwrkl/">http://dcoe.adobeconnect.com/p3r437gwrkl/</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p6hnn48yeu4/">http://dcoe.adobeconnect.com/p6hnn48yeu4/</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p1eqzd8c6zb/">http://dcoe.adobeconnect.com/p1eqzd8c6zb/</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p1pdvdvuukg/">http://dcoe.adobeconnect.com/p1pdvdvuukg/</a>
          </div>
          <div style={styles.linkItem}>
            <a target="_blank" href="http://dcoe.adobeconnect.com/p66bbvuguj2/">http://dcoe.adobeconnect.com/p66bbvuguj2/</a>
          </div>
        </div>
    );
  }
}