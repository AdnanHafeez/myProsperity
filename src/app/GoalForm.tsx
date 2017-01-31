import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {GoalReducerInterface, WorkbookReducerInterface} from './data/workbook';

const validate = values => {
  const errors:any = {}
  if (!values.goal) {
    errors.goal = 'Required'
  }
  return errors
}
const styles = {
  layout: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
  }
}

interface MyProps {
  goal: GoalReducerInterface;
  workbook: WorkbookReducerInterface;
  handleSubmit(goal: GoalReducerInterface): any;
}

interface MyState {
   title: string;
}
export default class GoalForm extends React.Component<MyProps, MyState>{
  constructor (props, context) {
    super(props, context);
    this.state = {
      title: props.goal.title,
    };
  }
  handleChange = (event) => {
    console.log("Change event");
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      title: value
    } as any);
  }
  render(){
    const {handleSubmit,goal} = this.props;
    const formSubmit = (event) => {

      handleSubmit({id: this.props.goal.id, title: this.state.title, desc: ''});
      event.preventDefault();
    }
    
    const touched = false;
    const error = false;
    return (
      <form onSubmit={formSubmit}>
      <div style={styles.layout as any}>
        <div>
        <TextField 
              floatingLabelText={'Goal'} 
              hintText={'Enter Text Here'} 
              multiLine={true}
              rows={1}
              rowsMax={2}
              name='title'
              value={this.state.title}
              fullWidth={true}
              onChange={this.handleChange}
              errorText={touched && error} />
        </div>
        <div>
          <RaisedButton type="submit" label="Save" />
        </div>
      </div>
      </form>
    );
  }
}



/* redux-form to slow 

GoalForm = reduxForm({
  form: 'goalsForm',
  validate
})((GoalForm  as any));
*/
