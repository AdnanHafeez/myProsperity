import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import {switchToAppProvider} from './actions/security';


interface MyProps {
  submitForm(any): any;
}

interface MyState {
  pin: string;
}

class SecurityLoginPin extends React.Component<MyProps, MyState>{
  constructor(props){
    super(props);
    this.state = {pin: ''};
  }
  handleChange = (event) => {
    this.setState({pin: event.target.value})
  }

  handleSubmit = (event) => {
      const {submitForm} = this.props;
      submitForm(this.state.pin);
      event.preventDefault();
  }
  render(){
    
    return (<div>
       <div>
         <form onSubmit={this.handleSubmit} >
              <TextField 
            floatingLabelText={'Enter Pin'} 
            hintText={'1234'} 
            multiLine={false}
            errorText={''} value={this.state.pin} onChange={this.handleChange} />

            <FlatButton label="Login" type="submit" />
         </form>
       </div>
       <FlatButton label="Forgot Pin" containerElement={<Link to={'security/forgotpin'} />} />
    </div>);
  }
}

export default SecurityLoginPin;
