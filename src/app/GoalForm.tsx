import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

const renderTaskField = ({input, label, meta: {touched, error}}) => {
    return (
      <TextField 
            floatingLabelText={label} 
            hintText={label} 
            errorText={touched && error} {...input} />
    );
}

let GoalForm = (props) => {
  const {handleSubmit, load, pristine, reset, submitting ,goal} = props;

  return (<form onSubmit={handleSubmit}>
 
      <Field name="goal" component={renderTaskField} />
      <RaisedButton type="submit" label="Add" />
    </form>
  );
}



GoalForm = reduxForm({
  form: 'goalsForm'
})((GoalForm  as any));


export default connect(state => {
  let data = {goal: ''};
  if(state.loadedGoalId > 0){
    data = {goal: state.goals[state.loadedGoalId + ''].title};
  }
  return {
    initialValues: data

  }
})
(GoalForm) as any;

//export default GoalForm;
