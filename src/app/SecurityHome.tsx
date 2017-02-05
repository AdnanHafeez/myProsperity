import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import {cordovaLoginWithPin, SetPinFormInterface, cordovaInitLogin} from './actions/security';

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
  submitPin(data: SetPinFormInterface): any;
  initPin(data: SetPinFormInterface): any;
  fipsIsSetUp: boolean;
  question1: any,
  question2: any,
  questions: any[];
}

interface MyState {
}


class SecurityHome extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
  }
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Enter Pin');
  }

  render () {
    const {submitPin,fipsIsSetUp,initPin,questions} = this.props;

    if(fipsIsSetUp){
      return (<SecurityPinLogin submitForm={submitPin} />)
    }
    return (
      <SecuritySetPinContainer 
              questions={questions}
              submitForm={initPin} />
    );
  }
}

const stateToProps = (state) => {
  return {
    fipsIsSetUp: state.sUser.fipsIsSetUp,
    question1: {},
    question2: {},
    questions: state.pinQuestionIds
        .map(questionId => state.pinQuestions[questionId + ''])
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    submitPin: (data: SetPinFormInterface) => {
      dispatch(cordovaLoginWithPin(data.pin));
    }, 
    initPin: (data: SetPinFormInterface) => {
      console.log(data);
      console.log('cordovaInitLogin');
      dispatch(cordovaInitLogin(data));
    },
  }
}
export default connect(stateToProps, dispatchToProps)
(SecurityHome);

