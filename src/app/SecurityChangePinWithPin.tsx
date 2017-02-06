import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import {switchToAppProvider, ChangePinWithPinFormInterface, changePinWithPin} from './actions/security';

const validateForm = (values: ChangePinWithPinFormInterface): any => {
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
      case 'newPin':
        break;
      case 'confirmNewPin':
        if(values.newPin !== values.confirmNewPin){
          results.fields[propName] = 'Your pins must match.';
        }
        break;
      default: //unexpected value
        results.errorMessage = 'Unexpected form field "' + propName +'".'
    }
    //no empty fields
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
  submitData(any): any;
}

interface MyState {
  values: ChangePinWithPinFormInterface,
  errors: ChangePinWithPinFormInterface
}

class SecurityChangePinWithPin extends React.Component<MyProps, MyState>{
  constructor(props){
    super(props);
    let fields: ChangePinWithPinFormInterface = {
      currentPin: '',
      newPin: '',
      confirmNewPin: '',
    };
    this.state = {
      values: fields,
      errors: fields
    };
  }
  handleChange = (event) => {
    console.log("Change event");
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      values: {...this.state.values,[name]: value},
      errors: {...this.state.errors,[name]: ''}
    } as any);
  }

  handleSubmit = (event) => {
      const {submitData} = this.props;
      console.log(this.state.values);
      const result = validateForm(this.state.values);
      if(result.isValid){
        submitData(this.state.values);
      }
      this.setState({
        errors: {...result.fields}
      } as any);

      event.preventDefault();
  }
  render(){
    
    return (
     <div>
       <div>
         <form onSubmit={this.handleSubmit} >
             <div>
              <TextField 
                floatingLabelText={'Enter Current Pin'} 
                multiLine={false}
                name='currentPin'
                errorText={this.state.errors.currentPin} 
                value={this.state.values.currentPin} 
                onChange={this.handleChange} />
            </div>
             <div>
              <TextField 
                floatingLabelText={'Enter New Pin'} 
                multiLine={false}
                name='newPin'
                errorText={this.state.errors.newPin} 
                value={this.state.values.newPin} 
                onChange={this.handleChange} />
            </div>
             <div>
              <TextField 
                floatingLabelText={'Confirm New Pin'} 
                multiLine={false}
                name='confirmNewPin'
                errorText={this.state.errors.confirmNewPin} 
                value={this.state.values.confirmNewPin} 
                onChange={this.handleChange} />
            </div>
            <div>
              <RaisedButton primary={true} label="Change" type="submit" />
            </div>
         </form>
       </div>
       <div style={{float: 'right'}}>
         <FlatButton label="Cancel" containerElement={<Link to={'/'} />} />
       </div>
    </div>);
  }
}

const stateToProps = () => {
  return {

  }
}
const dispatchToProps = (dispatch) => {
  return {
    submitData: (data: ChangePinWithPinFormInterface) => {
      dispatch(changePinWithPin(data));
    }
  }
}
export default connect(stateToProps,dispatchToProps)(SecurityChangePinWithPin);


