import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {NoteReducerInterface} from './data/workbook';
const validate = values => {
  const errors:any = {}
  if (!values.note) {
    errors.note = 'Required'
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
  note: NoteReducerInterface;
  handleSubmit({text: string}): any;
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
    (this as any).textInput.focus();
  }
  render(){
    const {handleSubmit,note} = this.props;
    const formSubmit = (event) => {
      handleSubmit({text: this.state.text});
      event.preventDefault();
    }
    return (
      <form onSubmit={formSubmit}>
        <div style={styles.layout as any}>
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
          <div style={styles.buttonContainer as any}>
            <div>
              <RaisedButton type="submit" primary={true} disabled={false} label="Save" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
