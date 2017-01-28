import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import {switchToAppProvider} from './actions/security';

const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  error: boolean;
  input: {value: any, name: string}
  submitPin(any): any;
}

interface MyState {
  pin: any;
}


class SecurityHome extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    this.state = {pin: ''};
  }
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Enter Pin');
  }

  handleChange = (event) => {
    this.setState({pin: event.target.value})
  }

  render () {
    var {error,input,submitPin} = this.props;

    return (
      <div>
         <div>
         <form onSubmit={submitPin} >
              <TextField 
            floatingLabelText={'Enter Pin'} 
            hintText={'1234'} 
            multiLine={false}
            errorText={error} value={this.state.pin} onChange={this.handleChange} />

            <FlatButton label="Login" type="submit" />
         </form>
         </div>
         <br />
         <br />
         <Link to={'security/forgotpin'}>Forgot Pin</Link>
         <br />
         <br />
         <FlatButton label="Forgot Pin" containerElement={<Link to={'security/forgotpin'} />} />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {

  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    submitPin: (event) => {
      dispatch(switchToAppProvider());
      event.preventDefault();
    }  
  }
}
export default connect(stateToProps, dispatchToProps)
(SecurityHome);