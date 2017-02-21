/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';
import AppBarMenuIcon from './AppBarMenuIconDrawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SnackBarNotice from './SnackBarNoticeComponent';
import {FlashMessageInterface} from './data/workbook';
import Eula from './Eula';



const styles = {
  content: {

  }
};


interface SettingsMenuProps {
  turnAppOffRedirect(path:string): any;
}

interface SettingsMenuState {
  openMenu: boolean;
}

class SettingMenuComponent extends React.Component<SettingsMenuProps, SettingsMenuState> {

  render(){
    const {turnAppOffRedirect} = this.props;

    return (<IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}

    >
      
      <MenuItem key={'default_1'} primaryText="Change Pin" onTouchTap={() => turnAppOffRedirect('/security/changepin')}  />
      <MenuItem key={'default_2'}  primaryText="Edit Security Questions" onTouchTap={() => turnAppOffRedirect('/security/changequestions')} />
      <MenuItem key={'default_3'}  primaryText="Sign Out" onTouchTap={() => turnAppOffRedirect('/')} />
    </IconMenu>)
  }
}


interface MyProps {
  appBarTitle?(title: string): any;
  children: any;
  turnAppOffRedirect(path: string): any;
  flash: FlashMessageInterface
}

interface MyState {
  title?: any;
  open?: boolean;
}


export default class MainComponent extends React.Component<MyProps, MyState>{
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


  render () {
    var {turnAppOffRedirect, flash} = this.props;
    return (
        <div>
            <AppBar
                title={this.state.title}
                titleStyle={{textAlign: 'center'}}
                iconElementLeft={<AppBarMenuIcon/>}
                iconElementRight={<SettingMenuComponent   turnAppOffRedirect={turnAppOffRedirect} />}
                 />

                <div style={{'padding': '10px'} as any}>
                <div style={styles.content as any}>{React.cloneElement(this.props.children, { appBarTitle: this.handleTitle })}</div>
                </div>
                <Eula />
                <SnackBarNotice flash={flash} />
        </div>
    );
  }
}