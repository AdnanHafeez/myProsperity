import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import {ChangePinWithQuestionsFormInterface} from './actions/security';
import SecurityHome from './SecurityHome'

const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

const validateForm = (values: ChangePinWithQuestionsFormInterface): any => {
  let fields = Object.keys(values).reduce((accum,current) => {
                                               accum[current] = '';
                                               return accum;
                                            },{});


  const results = {...{fields},isValid: false, errorMessage: ''};
  let isFormValid = true;
  Object.keys(fields).map(function(propName){
    switch(propName){
      case 'newPin':
        break;
      case 'answer1':
        break;
      case 'answer2':
        break;
      default: //unexpected value
        results.errorMessage = 'Unexpected form field "' + propName +'".'
    }
    //no empty fields
    if(values[propName].length === 0){
       isFormValid = false;
       results.fields[propName] = 'Required';
    }
    if(results.fields[propName].length > 0){
       isFormValid = false;
    }
  });
  results.isValid = isFormValid && results.errorMessage.length === 0;

  return results;
}

interface MyProps {
  question1: any,
  question2: any,
  appBarTitle(title:string): any;
  submitFormValues(any): any;
}

interface MyState {
  values: ChangePinWithQuestionsFormInterface;
  errors: ChangePinWithQuestionsFormInterface;
}
class SecurityPinRecoveryContainer extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    let fields: ChangePinWithQuestionsFormInterface = {
      newPin: '',
      answer1: '',
      answer2: ''
    };
    this.state = {
      values: fields,
      errors: fields
    };
  }

  componentWillUpdate(nextProps) {
    this.props.appBarTitle && this.props.appBarTitle('New Pin');
  }

  handleSubmit = (event) => {
    var {submitFormValues} = this.props;
    let result = validateForm(this.state.values);

    if(result.isValid){
      submitFormValues(this.state.values);
    }
    
    this.setState({
      errors: {...result.fields}
    } as any);
  }

  handleChange = (event) => {
    console.log("Change event");
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      values: {...this.state.values,[name]: value},
      errors: {...this.state.errors,[name]: ''}
    } as any);
  }
  handleFocus = (event) => {
    console.log("Focus event");
    console.log(event.target.hasFocus);
  }

  render () {
    var {submitFormValues, question1, question2} = this.props;

    if(!question1 || !question2){ //if questions aren't established then load home page
      return <SecurityHome />;
    }
    return (
      <div style={{maxWidth: 400,width: '90%'} as any}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField 
                  floatingLabelText={'New Pin'} 
                  hintText={'My Secret Pin'} 
                  multiLine={false}
                  fullWidth={true}
                  name='newPin'
                  errorText={this.state.errors.newPin} value={this.state.values.newPin} onChange={this.handleChange} />
          </div>
          <div>
              <TextField 
                    floatingLabelText={question1.title} 
                    floatingLabelFixed={false}
                    fullWidth={true}
                    multiLine={false}
                    name='answer1'
                    onFocus={this.handleFocus}
                    errorText={this.state.errors.answer1} value={this.state.values.answer1} onChange={this.handleChange} />
          </div>
          <div>
            <TextField 
                  floatingLabelText={question2.title}  
                  floatingLabelFixed={false}
                  multiLine={false}
                  fullWidth={true}
                  name='answer2'
                  onFocus={this.handleFocus}
                  errorText={this.state.errors.answer2}
                  value={this.state.values.answer2} onChange={this.handleChange} />
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

