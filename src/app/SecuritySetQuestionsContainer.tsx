import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {editQuestion1, editQuestion2, editAllQuestions} from './actions/security';
import FlatButton from 'material-ui/FlatButton';

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
  question1: any;
  question2: any;
  answer1: any;
  answer2: any;
}
class SecuritySetQuestionsContainer extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    this.state = {
      question1: '',
      question2: '',
      answer1: '',
      answer2: ''
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
      [name]: value
    } as any);
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

    return (
      <form onSubmit={formSubmit}>
        <div>
            <SelectField
              floatingLabelText="Question 1"
              value={this.state.question1}
              onChange={this.questionSelectChange('question1')}
              autoWidth={true}

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
                errorText='' value={this.state.answer1} onChange={this.handleChange} />
        </div>
        <div>
            <SelectField
              floatingLabelText="Question 2"
              value={this.state.question2}
              onChange={this.questionSelectChange('question2')}
              autoWidth={true}

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
              errorText='' value={this.state.answer2} onChange={this.handleChange} />
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
    questions: state.pinQuestionIds.map(questionId => state.pinQuestions[questionId + ''])
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    submitFormValues: (values) => {
      console.log(values);
      //TODO validation
      dispatch(editAllQuestions(values.question1,values.question2));
    }
  }
}
export default connect(
                    stateToProps,
                    dispatchToProps
                )(SecuritySetQuestionsContainer);

