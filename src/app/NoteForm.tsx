import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
const validate = values => {
  const errors:any = {}
  if (!values.note) {
    errors.note = 'Required'
  }
  return errors
}
const renderTaskField = ({input, label, meta: {touched, error}}) => {
    return (
      <TextField 
            floatingLabelText={label} 
            hintText={label} 
            multiLine={true}
            rows={2}
            rowsMax={4}
            fullWidth={true}
            errorText={touched && error} {...input} />
    );
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

let NoteForm = (props) => {
  const {handleSubmit, load, pristine, reset, submitting ,note} = props;

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.layout as any}>
        <div>
          <Field name="note" component={renderTaskField} />
        </div>
        <div style={styles.buttonContainer as any}>
          <div>
            <RaisedButton type="submit" primary={true} disabled={pristine || submitting} label="Save" />
          </div>
          <div>
            <RaisedButton onTouchTap={reset} secondary={true} disabled={pristine} label="Clear" />
          </div>
        </div>
      </div>
    </form>
  );
}



NoteForm = reduxForm({
  form: 'notesForm',
  validate
})((NoteForm  as any));


export default connect(state => {
  let data = {note: ''};
  if(state.loadedNoteId > 0){
    data = {note: state.notes[state.loadedNoteId + ''].text};
  }
  return {
    initialValues: data
  }
})
(NoteForm) as any;
