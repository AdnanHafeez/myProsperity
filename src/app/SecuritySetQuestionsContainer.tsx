import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {ChangeQuestionsWithPinInterface, changeSecurityQuestions} from './actions/security';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import {subMenuFlexContainerStyle,selectTagStyle} from './commonStyles'
const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};
const validateForm = (values: ChangeQuestionsWithPinInterface): any => {
  let fields = Object.keys(values).reduce((accum,current) => {
                                               accum[current] = '';
                                               return accum;
                                            },{});


  const results = {...{fields},isValid: false, errorMessage: ''};
  let isFormValid = true;
  Object.keys(fields).map(function(propName){
    switch(propName){
      case 'currentPin':
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
  return results;
}
interface MyProps {
  appBarTitle(title:string): any;
  questions: any[];
  submitData(any): any;
}

interface MyState {
  values: ChangeQuestionsWithPinInterface,
  errors: ChangeQuestionsWithPinInterface
}
class SecuritySetQuestionsContainer extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);

    const fields:ChangeQuestionsWithPinInterface = {
      question1: '',
      question2: '',
      answer1: '',
      answer2: '',
      currentPin: ''
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
  /*
  questionSelectChange = (questionName: string) => {
      return (event, index, value) => {
        console.log(this.state);
        this.setState({[questionName]: value} as any);
      }
  }
  */
  questionSelectChange = (questionName: string) => {
      return (event) => {
        this.setState({
          values: {...this.state.values,[questionName]: event.target.value},
          errors: {...this.state.errors,[questionName]: ''}
        } as any);
      }
  }

  handleSubmit = (event) => {
    const {submitData} = this.props;
    const vresult = validateForm(this.state.values);
    if(vresult.isValid){
      submitData(this.state.values);
    }
    
    this.setState({
      errors: {...vresult.fields}
    } as any);

    event.preventDefault();
    event.preventDefault();
  }
  render () {
    const {questions} = this.props;

    return (
      <form onSubmit={this.handleSubmit}>

        <div>
          <TextField 
                floatingLabelText={'Current Pin'} 
                hintText={''} 
                multiLine={false}
                name='currentPin'
                errorText={this.state.errors.currentPin} value={this.state.values.currentPin} onChange={this.handleChange} />
        </div>
        <div>
            <div><label>Question 1</label></div>
            <div>{this.state.errors.question1}</div>
            <select 
              value={this.state.values.question1} 
              onChange={this.questionSelectChange('question1') as any}
              name='question1'
              style={selectTagStyle}
            >
              <option key='q1_none'>Select a question</option>
              {questions.map((question) => {
                  return <option key={'q1_' + question.id} value={question.id}>{question.title}</option>
              })}
            </select>
        </div>
        <div>
          <TextField 
                floatingLabelText={'Answer 1'} 
                hintText={''} 
                multiLine={false}
                name='answer1'
                errorText={this.state.errors.answer1}
                value={this.state.values.answer1} onChange={this.handleChange} />
        </div>
        <div>
            <div><label>Question 2</label></div>
            <div>{this.state.errors.question2}</div>
            <select 
              value={this.state.values.question2} 
              onChange={this.questionSelectChange('question2') as any}
              name='question2'
              style={selectTagStyle}
            >
              <option key='q2_none'>Select a question</option>
              {questions.map((question) => {
                  return <option key={'q2_' + question.id} value={question.id}>{question.title}</option>
              })}
            </select>
        </div>
        <div>
        <TextField 
              floatingLabelText={'Answer 2'} 
              hintText={''} 
              multiLine={false}
              name='answer2'
              errorText={this.state.errors.answer2}
              value={this.state.values.answer2} onChange={this.handleChange} />
        </div>
        <div style={subMenuFlexContainerStyle as any}>
          <div>
            <RaisedButton primary={true} label="Submit" type="submit" />
          </div>
          <div>
            <RaisedButton label="Cancel" containerElement={<Link to={'/'} />} />
          </div>
        </div>

      </form>
    );
  }
}

const stateToProps = (state) => {
  return {
    questions: state.pinQuestionIds.map(questionId => state.pinQuestions[questionId + ''])
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    submitData: (data: ChangeQuestionsWithPinInterface) => {
      dispatch(changeSecurityQuestions(data));
    }
  }
}
export default connect(
                    stateToProps,
                    dispatchToProps
                )(SecuritySetQuestionsContainer);

