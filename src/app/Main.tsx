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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SnackBarNotice from './SnackBarNoticeComponent';
import {FlashMessageInterface} from './data/workbook';

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


interface SettingsMenuProps {
  turnAppOffRedirect(path:string): any;
  settingsMenu: any[];
  open: boolean;
}

interface SettingsMenuState {
  openMenu: boolean;
}
class SettingMenuComponent extends React.Component<SettingsMenuProps, SettingsMenuState> {
  constructor(props){
    super(props);
    this.state = {
      openMenu: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.openMenu !== nextProps.open){
      this.setState({
        openMenu: nextProps.open
      })
    }
  }
  handleOnRequestChange = (openMenu) => {
    console.log('handleOnRequestChange');
    this.setState({
      openMenu
    });
  }
 
  handleItemTouchTap= (openMenu) => {
    console.log('handleItemTouchTap');
  }

  handleOnChange = () => {
    console.log('handleOnChange');
  }
  render(){
    const {turnAppOffRedirect,settingsMenu} = this.props;

    return (<IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      open={this.state.openMenu}
      onRequestChange={this.handleOnRequestChange}
      onChange={this.handleOnChange}
      onItemTouchTap={this.handleItemTouchTap}

    >
      
      <MenuItem key={'default_1'} primaryText="Change Pin" onTouchTap={() => turnAppOffRedirect('/security/changepin')}  />
      <MenuItem key={'default_2'}  primaryText="Edit Security Questions" onTouchTap={() => turnAppOffRedirect('/security/changequestions')} />
      <MenuItem key={'default_3'}  primaryText="Sign Out" onTouchTap={() => turnAppOffRedirect('/')} />
    </IconMenu>)
  }
}


interface MyProps {
  appBarTitle?(title: string): any;
  dispatch(arg: any): any;
  device: any;
  children: any;

  turnAppOffRedirect(path: string): any;
  flash: FlashMessageInterface
}

interface MyState {
  title?: any;
  open?: boolean;
  settingsMenu?: any[];
  settingsOpen: boolean;
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
      title: '',
      settingsMenu: [],
      settingsOpen: false
    };
  }

  componentWillMount () {
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }
  handleRequestClose () {
    this.setState({
      open: false
    } as any);
  }

  handleTouchTap () {
    this.setState({
      open: true
    }as any);
  }

  handleTitle (title) {
    this.setState({
      title: title
    }as any);
  }

  handleSettingMenu = (settingsMenu:any = []) => {
    this.setState({
      settingsMenu
    }as any);
  }

  handleSettingsMenuDropDown = (settingsOpen) => {
    console.log(settingsOpen);
    this.setState({
      settingsOpen
    }as any);
  }

  render () {
    var {turnAppOffRedirect, flash} = this.props;
    return (
        <div style={styles.wrapper}>
            <AppBar
                title={this.state.title}
                titleStyle={{textAlign: 'center'}}
                iconElementLeft={<AppBarMenuIcon/>}
                iconElementRight={<SettingMenuComponent open={this.state.settingsOpen} settingsMenu={this.state.settingsMenu}  turnAppOffRedirect={turnAppOffRedirect} />}
                 />
                <div style={styles.content as any}>{React.cloneElement(this.props.children, { 
                                                                                              appBarTitle: this.handleTitle, 
                                                                                              settingsMenu: this.handleSettingMenu,
                                                                                              settingsMenuDropDown: this.handleSettingsMenuDropDown
                                                                                            })}</div>

          <SnackBarNotice flash={flash} />
        </div>
    );
  }
}
 
export default connect(
  (state) => ({
    device: state.device,
    flash: state.view.flash
  }),
  (dispatch, ownProps) => {
    return {
      dispatch: dispatch,
      turnAppOffRedirect: (path) => {
        console.log(path);
        dispatch(turnAppOff(path))
      }
    };
  }
  )(Main);
