import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import {switchToAppProvider} from './actions/security';
import SecurityPinLogin from './SecurityPinLogin';
import SecuritySetPinContainer from './SecuritySetPinContainer';
const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  error: boolean;
  input: {value: any, name: string}
  submitPin(any): any;
  fipsIsSetUp: boolean;
}

interface MyState {
  pin: any;
}


class SecurityHome extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    this.state = {pin: ''};
  }
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Enter Pin');
  }

  handleChange = (event) => {
    this.setState({pin: event.target.value})
  }

  render () {
    const {error,input,submitPin,fipsIsSetUp} = this.props;

    if(fipsIsSetUp){
      return (<SecurityPinLogin submitPin={submitPin} />)
    }
    return (
      <SecuritySetPinContainer />
    );
  }
}

const stateToProps = (state) => {
  return {
    fipsIsSetUp: state.sUser.fipsIsSetUp
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    submitPin: (event) => {
      dispatch(switchToAppProvider());
      event.preventDefault();
    }  
  }
}
export default connect(stateToProps, dispatchToProps)
(SecurityHome);