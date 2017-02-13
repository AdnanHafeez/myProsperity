import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import {PinLoginFormInterface} from './actions/security';
import {unlockApplication,lockApplication} from './actions/security';
//   <RaisedButton label="Test Error Message" onTouchTap={testSnackBar} />
const validateForm = (values: PinLoginFormInterface): any => {
  let fields = Object.keys(values).reduce((accum,current) => {
                                               accum[current] = '';
                                               return accum;
                                            },{});


  const results = {...{fields},isValid: false, errorMessage: ''};
  let isFormValid = true;
  Object.keys(fields).map(function(propName){
    switch(propName){
      case 'pin':
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
  submitForm(any): any;
}

interface MyState {
  values: PinLoginFormInterface,
  errors: PinLoginFormInterface
}

class SecurityLoginPin extends React.Component<MyProps, MyState>{
  constructor(props){
    super(props);
    let fields: PinLoginFormInterface = {
      pin: ''
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
      const {submitForm} = this.props;
      console.log(this.state.values);
      const result = validateForm(this.state.values);
      if(result.isValid){
        submitForm(this.state.values);
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
                floatingLabelText={'Enter Pin'} 
                hintText={'1234'} 
                multiLine={false}
                name='pin'
                errorText={this.state.errors.pin} 
                value={this.state.values.pin} 
                onChange={this.handleChange} />
            </div>
            <div>
              <RaisedButton primary={true} label="Login" type="submit" />
                
            </div>
         </form>
       </div>
       <div style={{float: 'right'}}>
         <FlatButton label="Forgot Pin" containerElement={<Link to={'security/forgotpin'} />} />
       </div>
    </div>);
  }
}

export default SecurityLoginPin;
