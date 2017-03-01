import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import {cordovaLoginWithPin, SetPinFormInterface, cordovaInitLogin} from './actions/security';
import {sendErrorMessage} from './actions'
import Intro from './Intro';
import SecurityPinLogin from './SecurityPinLogin';
import SecuritySetPinContainer from './SecuritySetPinContainer';


interface MyProps {
  appBarTitle(title: string): any;
  submitPin(data: SetPinFormInterface): any;
  initPin(data: SetPinFormInterface): any;
  fipsIsSetUp: boolean;
  question1: any,
  question2: any,
  questions: any[];
  mode: number;
}

interface MyState {
}


class SecurityHome extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
  }
  componentWillMount () {
    const {mode} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(mode === 1 ? 'Intro' :'Enter Pin');
  }

  render () {
    const {submitPin,fipsIsSetUp,initPin,questions,mode} = this.props;
    if (mode === 1) {
      return <Intro />
    }

    if (fipsIsSetUp){
      return <SecurityPinLogin submitForm={submitPin} />;
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
    mode: state.mode,
    fipsIsSetUp: state.user.fipsIsSetUp,
    question1: {},
    question2: {},
    questions: state.pinQuestionIds
        .map(questionId => state.pinQuestions[questionId + ''])
  }
}
let errCount = 0;
const dispatchToProps = (dispatch,ownProps) => {
  return {
    submitPin: (data: SetPinFormInterface) => {
      dispatch(cordovaLoginWithPin(data.pin));
    }, 
    initPin: (data: SetPinFormInterface) => {
      dispatch(cordovaInitLogin(data));
    }
  }
}
export default connect(stateToProps, dispatchToProps)
(SecurityHome);

