import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {foatingButtonStyle, fullWidthDialagStyle} from './commonStyles';
import {eula} from './data/settings'
import { connect } from 'react-redux';
import { eulaAccepted, eulaRejected } from './actions/security';
interface MyProps {
  eulaAccepted: boolean;
  accept(): any;
  reject(): any;
  hideRejectButton: boolean;
}

interface MyState {

}

class Eula extends React.Component<MyProps, MyState> {

  render(){
    const {accept,reject,eulaAccepted,hideRejectButton} = this.props;
    let actions = [
      <FlatButton
        label="Accept"
        primary={true}
        onTouchTap={accept}
      />
    ];

    if(!hideRejectButton){
      actions.push(<FlatButton
            label="Reject"
            primary={true}
            onTouchTap={reject}
        />);
    }

    return (
      <div>
    
        <Dialog
          title="EULA"
          actions={actions}
          modal={false}
          open={!eulaAccepted}
          contentStyle={fullWidthDialagStyle}
          autoScrollBodyContent={true}
        >
          <h3>{eula.title}</h3>
          {eula.paragraphs.map((para,i) => <p key={i}>{para}</p>)}

        </Dialog>
      </div>
    );
  }
}
const getPlatform = () =>{
  let platform = 'browser';
  if(typeof (window as any).device !== 'undefined'){ //should be set in the case of cordova
    platform = (window as any).device.platform;
  }
  return platform.toLowerCase();
}

const shouldHideRejectButton = () => {
  return getPlatform() !== 'android';
}

const stateToProps = (state) => {
  return {
    eulaAccepted: state.sUser.eulaAccepted,
    hideRejectButton: shouldHideRejectButton()
  }
}
const dispatchToProps = (dispatch) => {
  return {
    accept: () => dispatch(eulaAccepted()),
    reject: () => dispatch(eulaRejected())
  }
  
}
export default connect(
  stateToProps,
  dispatchToProps)
(Eula);