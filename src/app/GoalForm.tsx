import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
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
const renderTaskField = ({input, label, meta: {touched, error}}) => {
    return (
      <TextField 
            floatingLabelText={label} 
            hintText={label} 
            multiLine={true}
            rows={1}
            rowsMax={2}
            fullWidth={true}
            errorText={touched && error} {...input} />
    );
}

let GoalForm = (props) => {
  const {handleSubmit, load, pristine, reset, submitting ,goal} = props;

  return (
    <form onSubmit={handleSubmit}>
    <div style={styles.layout as any}>
      <div>
        <Field name="goal" component={renderTaskField} />
      </div>
      <div>
        <RaisedButton type="submit" label="Save" />
      </div>
    </div>
    </form>
  );
}



GoalForm = reduxForm({
  form: 'goalsForm',
  validate
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
