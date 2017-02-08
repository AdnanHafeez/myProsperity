import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {NoteReducerInterface} from './data/workbook';
import {topRightButtonStyle} from './commonStyles'
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
    const {handleSubmit,note} = this.props;
    const formSubmit = (event) => {
      handleSubmit({text: this.state.text});
      event.preventDefault();
    }
    return (
      <div>
        <form onSubmit={formSubmit}>
          <div style={topRightButtonStyle}>
            <RaisedButton type="submit" primary={true} disabled={false} label="Save" />
          </div>

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
        </form>
      </div>
    );
  }
}
