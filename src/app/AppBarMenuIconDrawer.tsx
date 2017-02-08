import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';


/**
 * AppBarMenuIcon provides the left icon in the top navigation bar
 * @param  {[type]} options.paths   [description]
 * @param  {[type]} options.submenu [description]
 * @param  {[type]} options.parent  [description]
 * @return {[type]}                 [description]
 */

interface MyProps {
  paths: any;
  submenu: any;
  parent: any;
  workbooks: any;
}

interface MyState {
  open: boolean;
}

class AppBarMenuIconDrawer extends React.Component<MyProps, MyState> {
    constructor (props, context) {
      super(props);
      this.state = {open: false};
    }

    handleToggle = () => {
       this.setState({open: !this.state.open});
    }
    handleClose = () => {
       this.setState({open: false});
    }
    render(){
      const {paths, submenu, parent,  workbooks} = this.props;
        return (
          <div>
            <IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
            <Drawer
              docked={false}
              width={250}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >

              <MenuItem key={'static_directors_message'} primaryText="Director's Message" onTouchTap={this.handleClose} containerElement={<Link to={'/main/message'} />}  />
              <MenuItem key={'static_smart_goals'} primaryText={'S.M.A.R.T. Goals'} onTouchTap={this.handleClose} containerElement={<Link to='/main/home' />} />
            
              {workbooks.map((item) => (
                 <MenuItem key={'workbook_' + item.id} primaryText={item.title} onTouchTap={this.handleClose} containerElement={<Link to={'/main/workbook/'+item.id} />}  />
              ))}

              <MenuItem key={'notes_landing'} primaryText="Notes" onTouchTap={this.handleClose} containerElement={<Link to={'/main/notes'} />}  />
            </Drawer>
          </div>
          );
    }
}

/**
 * The state to component binding should be factored out of this component
 * for the sake of reusability.
 */
const mapStateToProp = (state, ownProps) => {
  return {
    paths: state.navigation.paths, // object containing state information about navigation
    submenu: state.navigation.paths.current.childrenIds.map((id) => (state.navigation.tree[id + ''])), // get children of current path
    parent: state.navigation.paths.parent, // for convenience we introduce the parent as a property as a default back button destination
    workbooks: state.workbookIds.map((id) => (state.workbooks[id+'']))
  };
};

const dispatchToProp = (dispatch) => {
  return {
  }
};
export default connect(mapStateToProp,dispatchToProp)(AppBarMenuIconDrawer);

