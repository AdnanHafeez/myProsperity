
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

interface MyProps {
  title: string;
  items: {id: any, title: string, desc: string}[];
}

interface MyState {
}

export default class BasicDialog extends React.Component<MyProps, MyState> {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {title, items} = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label={title} onTouchTap={this.handleOpen} />
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <List>
          {items.map((item) => (<ListItem key={item.id} primaryText={item.title} secondaryText={item.desc} />))}
        </List>
        </Dialog>
      </div>
    );
  }
}