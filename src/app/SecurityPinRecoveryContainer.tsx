import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {editQuestion1, editQuestion2, editPinForm} from './actions/security';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';


const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  question1: any,
  answer1: any,
  question2: any,
  answer2: any,
  appBarTitle(title:string): any;
  questions: any[];
  editQuestion1(any): any;
  editQuestion2(any): any;
  submitFormValues(any): any;
}

interface MyState {
  answer1: any;
  answer2: any;
  newPin
}
class SecurityPinRecoveryContainer extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    this.state = {
      answer1: '',
      answer2: '',
      newPin: ''
    };
  }

  componentWillUpdate(nextProps) {
    this.props.appBarTitle && this.props.appBarTitle('New Pin');
  }

  handleChange = (event) => {
    console.log("Change event");
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      [name + 'Focus']: true
    } as any);
  }
  handleFocus = (event) => {
    console.log("Focus event");
    console.log(event.target.hasFocus);
  }

  questionSelectChange = (questionName: string) => {
      return (event, index, value) => {
        console.log(this.state);
        this.setState({[questionName]: value} as any);
      }
  }

  render () {
    var {submitFormValues, question1, question2, answer1, answer2, questions,editQuestion1, editQuestion2} = this.props;
    const formSubmit = (event) => {
      submitFormValues(this.state);
      event.preventDefault();
    }

    const handleLabelLength = (label: string) => {
      //stub for handling truncation
      return label;
    }

    return (
      <div style={{maxWidth: 400,width: '90%'} as any}>
        <form onSubmit={formSubmit}>
          <div>
            <TextField 
                  floatingLabelText={'New Pin'} 
                  hintText={'My Secret Pin'} 
                  multiLine={false}
                  fullWidth={true}
                  name='newPin'
                  errorText='' value={this.state.newPin} onChange={this.handleChange} />
          </div>
          <div>
              <TextField 
                    floatingLabelText={question1.title} 
                    floatingLabelFixed={false}
                    fullWidth={true}
                    multiLine={false}
                    name='answer1'
                    onFocus={this.handleFocus}
                    errorText='' value={this.state.answer1} onChange={this.handleChange} />
          </div>
          <div>
            <TextField 
                  floatingLabelText={question2.title}  
                  floatingLabelFixed={false}
                  multiLine={false}
                  fullWidth={true}
                  name='answer2'
                  onFocus={this.handleFocus}
                  errorText='' 
                  value={this.state.answer2} onChange={this.handleChange} />
          </div>
          <div>
            <div>
              <FlatButton label="Submit" type="submit" />
            </div>
            <div>
              <FlatButton label="Back" type="submit" containerElement={<Link to='/' />} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    question1: state.pinQuestions[state.selectedPinQuestionIds[0]],
    question2: state.pinQuestions[state.selectedPinQuestionIds[1]],
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    submitFormValues: (values) => {
      console.log(values);
      //TODO validation
    }
  }
}
export default connect(
                    stateToProps,
                    dispatchToProps
                )(SecurityPinRecoveryContainer);

