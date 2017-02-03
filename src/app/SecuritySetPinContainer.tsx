import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {editQuestion1, editQuestion2, editPinForm} from './actions/security';
import FlatButton from 'material-ui/FlatButton';
interface FormValues {
  question1: string;
  question2: string;
  answer1: string;
  answer2: string;
  pin: string;
  pinConfirm: string;
}

interface FormErrors {
  isValid: boolean;
  errorMessage: string;
  fields: FormValues;
}

const validateForm = (values: FormValues): any => {
  let fields = Object.keys(values).reduce((accum,current) => {
                                               accum[current] = '';
                                               return accum;
                                            },{});
  
  //const results = {...{fields,isValid: false, errorMessage: ''};

  const results = {...{fields},isValid: false, errorMessage: ''};
  let isFormValid = true;
  Object.keys(fields).map(function(propName){
    switch(propName){
      case 'pin':
        if(values.pin !== values.pinConfirm){
          results.fields[propName] = 'Your pins must match.';
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
  values: FormValues;
  errors: FormValues;
}
class SecuritySetQuestionsContainer extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    let fields:FormValues = {
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
    this.props.appBarTitle && this.props.appBarTitle('Security Questions');
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
    var {submitFormValues} = this.props;
    let result = validateForm(this.state.values);

    if(result.isValid){
      submitFormValues(this.state);
    }
    
    this.setState({
      errors: {...result.fields}
    } as any);

    event.preventDefault();
  }

  questionSelectChange = (questionName: string) => {
      return (event, index, value) => {
        this.setState({
          values: {...this.state.values,[questionName]: value},
          errors: {...this.state.errors,[questionName]: ''}
        } as any);
      }
  }

  render () {
    const {submitFormValues, question1, question2, answer1, answer2, questions,editQuestion1, editQuestion2} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField 
                floatingLabelText={'Enter Pin'} 
                hintText={''} 
                multiLine={false}
                name='pin'
                errorText={this.state.errors.pin} value={this.state.values.pin} onChange={this.handleChange} />
        </div>
        <div>
          <TextField 
                floatingLabelText={'Confirm Pin'} 
                hintText={''} 
                multiLine={false}
                name='pinConfirm'
                errorText={this.state.errors.pinConfirm} value={this.state.values.pinConfirm} onChange={this.handleChange} />
        </div>
        <div>
            <SelectField
              floatingLabelText="Question 1"
              value={this.state.values.question1}
              onChange={this.questionSelectChange('question1')}
              autoWidth={true}
              errorText={this.state.errors.question1}
            >
            {questions.map((question) => {
                return <MenuItem key={question.id} value={question.id} primaryText={question.title} />
            })}
            

          </SelectField>
        </div>
        <div>
          <TextField 
                floatingLabelText={'Answer 1'} 
                hintText={''} 
                multiLine={false}
                name='answer1'
                errorText={this.state.errors.answer1} value={this.state.values.answer1} onChange={this.handleChange} />
        </div>
        <div>
            <SelectField
              floatingLabelText="Question 2"
              value={this.state.values.question2}
              onChange={this.questionSelectChange('question2')}
              autoWidth={true}
              errorText={this.state.errors.question2}
            >
            {questions.map((question) => {
                return <MenuItem key={question.id} value={question.id} primaryText={question.title} />
            })}
            

          </SelectField>
        </div>
        <div>
        <TextField 
              floatingLabelText={'Answer 2'} 
              hintText={''} 
              multiLine={false}
              name='answer2'
              errorText={this.state.errors.answer2} value={this.state.values.answer2} onChange={this.handleChange} />
        </div>
        <div>
          <FlatButton label="Submit" type="submit" />
        </div>
      </form>
    );
  }
}

const stateToProps = (state) => {
  return {
    question1: {},
    question2: {},
    questions: state.pinQuestionIds
        .map(questionId => state.pinQuestions[questionId + ''])

  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    submitFormValues: (values) => {
      console.log(values);
      //TODO validation

      dispatch(editPinForm(values.question1,values.answer1, values.question2,values.answer2));
    }
  }
}
export default connect(
                    stateToProps,
                    dispatchToProps
                )(SecuritySetQuestionsContainer);

