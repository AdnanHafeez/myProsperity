import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SnackBar from 'material-ui/Snackbar';
import {FlashMessageInterface} from './data/workbook';

interface MyProps {
  flash: FlashMessageInterface;
}

interface MyState {
  open: boolean
}
export default class SnackBarNotice extends React.Component<MyProps, MyState>{
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  handleClose = () => {
    this.setState({open: false});
  }

  componentWillReceiveProps(nextProps){
    const {open} = nextProps.flash;
    this.state = {
      open: open
    };
  }

  render(){
    const {message,open,type} = this.props.flash;
    return <SnackBar
              message={message}
              open={this.state.open}
              autoHideDuration={3000}
              onRequestClose={this.handleClose}
             />
  }
}


