/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';
import AppSnackBar from './AppSnackBar';
import AppBarMenuIcon from './AppBarMenuIconDrawer';
import { connect } from 'react-redux';

import {push, replace} from 'react-router-redux';
import { withRouter } from 'react-router';
import {UpdateDialogContainer} from 'local-t2-app-redux/lib/components';

import {deviceActions} from 'local-t2-device-redux';
import {userLogin,userLogout,turnAppOff} from './actions';
import BlankPage from './BlankPage';
import SplashPage from './SplashPage';
var {windowResize} = deviceActions;

const styles = {
  wrapper: {
    maxWidth: '1500px',
    margin: '0 auto 0 auto'
  },
  content: {
    paddingTop: '10px'
  }
};
interface MyProps {
  appBarTitle?(title: string): any;
  dispatch(arg: any): any;
  device: any;
  children: any;
  isAuthed: boolean;
  authToggle(isAuthed: boolean): any;
}

interface MyState {
  title?: any,
  open?: boolean
}


class Main extends React.Component<MyProps, MyState>{
  static contextTypes: any = {
                                router: React.PropTypes.object.isRequired
                              };
  constructor (props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.state = {
      open: false,
      title: ''
    };
  }

  componentWillMount () {
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }
  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  handleTouchTap () {
    this.setState({
      open: true
    });
  }

  handleTitle (title) {
    this.setState({
      title: title
    });
  }

  render () {
    var {isAuthed, authToggle} = this.props;
    return (
        <div style={styles.wrapper}>
            <AppBar
                title={this.state.title}
                titleStyle={{textAlign: 'center'}}
                iconElementLeft={<AppBarMenuIcon/>}
                iconElementRight={<Toggle toggled={!isAuthed} onToggle={() => authToggle(isAuthed)} />}
                 />
                <div style={styles.content as any}>{React.cloneElement(this.props.children, { appBarTitle: this.handleTitle })}</div>
          <UpdateDialogContainer />
          <AppSnackBar />
        </div>
    );
  }
}
 
export default connect(
  (state) => ({
    device: state.device,
    isAuthed: state.mode === 1
  }),
  (dispatch, ownProps) => {
    return {
      dispatch: dispatch,
      authToggle: (authed) => {
        if(authed){
          dispatch(turnAppOff());
        } else {

        }
      }
    };
  }
  )(Main);
