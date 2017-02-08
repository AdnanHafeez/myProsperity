import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {SetPinFormInterface} from './actions/security';
import {labelStyle,fieldErrorStyle,fieldRowStyle} from './commonStyles';

interface FormErrors {
  isValid: boolean;
  errorMessage: string;
  fields: SetPinFormInterface;
}

const validateForm = (values: SetPinFormInterface): any => {
  let fields = Object.keys(values).reduce((accum,current) => {
                                               accum[current] = '';
                                               return accum;
                                            },{});


  const results = {...{fields},isValid: false, errorMessage: ''};
  let isFormValid = true;
  Object.keys(fields).map(function(propName){
    switch(propName){
      case 'pin':
        if(values.pin !== values.pinConfirm){
          results.fields[propName] = 'Your pins must match.';
        } else if (values.pin.length < 4){
          results.fields[propName] = 'Your pin must be at least 4 characters';
        }
        break;
      case 'pinConfirm':
        break;
      case 'question1':
        break;
      case 'question2':
        break;
      case 'answer1':
        break;
      case 'answer2':
        break;
      default: //unexpected value
        results.errorMessage = 'Unexpected form field "' + propName +'".'
    }
    //no empty fields
    console.log(propName);
    if(values[propName].length === 0){
       isFormValid = false;
       results.fields[propName] = 'Required';
    }
    if(results.fields[propName].length > 0){
       isFormValid = false;
    }
  });
  results.isValid = isFormValid && results.errorMessage.length === 0;
  console.log(results);
  return results;
}
interface MyProps {
  questions: any[];
  submitForm(any): any;
}

interface MyState {
  values: SetPinFormInterface;
  errors: SetPinFormInterface;
}
export default class SecuritySetQuestionsContainer extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    let fields:SetPinFormInterface = {
      pin: '',
      pinConfirm: '',
      question1: '',
      question2: '',
      answer1: '',
      answer2: ''
    };
    this.state = {
      values: fields,
      errors: fields
    };
  }

  componentWillUpdate(nextProps) {

  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      values: {...this.state.values,[name]: value},
      errors: {...this.state.errors,[name]: ''}
    } as any);
  }

  handleSubmit = (event) => {
    var {submitForm} = this.props;
    let result = validateForm(this.state.values);

    if(result.isValid){
      submitForm(this.state.values);
    }
    
    this.setState({
      errors: {...result.fields}
    } as any);

    event.preventDefault();
  }

  questionSelectChange = (questionName: string) => {
      return (event) => {
        this.setState({
          values: {...this.state.values,[questionName]: event.target.value},
          errors: {...this.state.errors,[questionName]: ''}
        } as any);
      }
  }

  render () {
    const {questions} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div style={fieldRowStyle}>
          <label>
            <div style={labelStyle}>Pin</div>
            <input type="text" name='pin' value={this.state.values.pin} onChange={this.handleChange}  />

          </label>
          <div style={fieldErrorStyle}>{this.state.errors.pin}</div>
        </div>
        <div style={fieldRowStyle}>
          <label>
            <div style={labelStyle}>Confirm Pin</div>
            <input type="text" name='pinConfirm' value={this.state.values.pinConfirm} onChange={this.handleChange}  />

          </label>
          <div style={fieldErrorStyle}>{this.state.errors.pinConfirm}</div>
        </div>
        <div style={fieldRowStyle}>
            <div><label>Question 1</label></div>
            <select 
              value={this.state.values.question1} 
              onChange={this.questionSelectChange('question1') as any}
              name='question1'
            >
              <option key='q1_none'>Select a question</option>
              {questions.map((question) => {
                  return <option key={'q1_' + question.id} value={question.id}>{question.title}</option>
              })}
            </select>
            <div style={fieldErrorStyle}>{this.state.errors.question1}</div>
        </div>
        <div style={fieldRowStyle}>
          <label>
            <div style={labelStyle}>Answer</div>
            <input type="text" name='answer1' value={this.state.values.answer1} onChange={this.handleChange}  />

          </label>
          <div style={fieldErrorStyle}>{this.state.errors.answer1}</div>
        </div>
        <div style={fieldRowStyle}>
            <div><label>Question 2</label></div>
            
            <select 
              value={this.state.values.question2} 
              onChange={this.questionSelectChange('question2') as any}
              name='question2'
            >
              <option key='q2_none'>Select a question</option>
              {questions.map((question) => {
                  return <option key={'q2_' + question.id} value={question.id}>{question.title}</option>
              })}
            </select>
            <div>{this.state.errors.question2}</div>
        </div>
        <div style={fieldRowStyle}>
          <label>
            <div style={labelStyle}>Answer</div>
            <input type="text" name='answer2' value={this.state.values.answer2} onChange={this.handleChange}  />

          </label>
          <div style={fieldErrorStyle}>{this.state.errors.answer2}</div>
        </div>
        <div style={fieldRowStyle}>
          <FlatButton label="Submit" type="submit" />
        </div>
      </form>
    );
  }
}