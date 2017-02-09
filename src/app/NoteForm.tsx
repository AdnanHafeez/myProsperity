import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {NoteReducerInterface} from './data/workbook';
import {subMenuFlexContainerStyle} from './commonStyles';
const validate = values => {
  const errors:any = {}
  if (!values.note) {
    errors.note = 'Required'
  }
  return errors
}

interface MyProps {
  note: NoteReducerInterface;
  handleSubmit({text: string}): any;
  handleClose(any): any;
  noteDelete(noteId: number): any;
}

interface MyState {
   text: string;
}
export default class NoteForm extends React.Component<MyProps, MyState> {
  
  constructor (props, context) {
    super(props, context);
    console.log(props);
    this.state = {
      text: props.note.text
    };
     
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      text: value
    } as any);
  }
  componentDidMount(){
   
  }
  render(){
    const {handleSubmit,note,handleClose,noteDelete} = this.props;
    const formSubmit = (event) => {
      handleSubmit({text: this.state.text});
      event.preventDefault();
    }
    let deleteButton = null;
    if(note.id > 0){
      deleteButton = <RaisedButton onTouchTap={() => noteDelete(note.id)} label="delete" />;
    }
    return (
      <div>
        <form onSubmit={formSubmit}>

          <div>
            <TextField 
                  floatingLabelText={'Note'} 
                  hintText={'Enter Text Here'} 
                  multiLine={true}
                  rows={1}
                  rowsMax={2}
                  name='text'
                  value={this.state.text}
                  fullWidth={true}
                  ref={(input) => { (this as any).textInput = input; }}
                  onChange={this.handleChange}
                  errorText={false} />
          </div>
          <div style={subMenuFlexContainerStyle as any}>
            <div>
              <RaisedButton primary={true} type="submit" label="Save" />
            </div>
            <div>
              {deleteButton}
            </div>
            <div>
              <RaisedButton onTouchTap={handleClose} type="button" label="Cancel" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
