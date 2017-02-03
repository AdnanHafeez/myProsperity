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
}

interface MyState {

}

class Eula extends React.Component<MyProps, MyState> {

  render(){
    const {accept,reject,eulaAccepted} = this.props;
    const actions = [
      <FlatButton
        label="Accept"
        primary={true}
        onTouchTap={accept}
      />,
        <FlatButton
            label="Reject"
            primary={true}
            onTouchTap={reject}
        />
    ];

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

const stateToProps = (state) => {
  return {
    eulaAccepted: state.sUser.eulaAccepted
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