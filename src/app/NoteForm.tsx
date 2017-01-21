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

let NoteForm = (props) => {
  const {handleSubmit, load, pristine, reset, submitting ,note} = props;

  return (<form onSubmit={handleSubmit}>
 
      <Field name="note" component={renderTaskField} />
      <RaisedButton type="submit" label="Save" />
    </form>
  );
}



NoteForm = reduxForm({
  form: 'notesForm'
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