import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import {push} from 'react-router-redux';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
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
  navigateTo(path:string): any
}

interface MyState {
  open: boolean;
}

class AppBarMenuIconDrawer extends React.Component<MyProps, MyState> {
    constructor (props, context) {
      super(props);
      this.state = {open: false};
    }

    handleToggle = (event) => {
        event.preventDefault();
        event.stopPropagation();

       this.setState({open: !this.state.open});
    }


    handleClose = (path) => {
      const {navigateTo} = this.props;
      return (event) => {

        event.preventDefault();
        event.stopPropagation();
        this.setState({open: false});
        navigateTo(path);
      }
    }
    render(){
      const {paths, submenu, parent,  workbooks} = this.props;
        return (
          <div>
            <IconButton onTouchTap={this.handleToggle}><MenuIcon /></IconButton>
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
              containerStyle={{paddingTop: 60}}
            >
             <Divider />
              <MenuItem key={'static_directors_message'} primaryText="Director's Message" onTouchTap={this.handleClose('/main/message')}   />
              <MenuItem key={'static_dir_goals'} primaryText={'Director\'s Goals'} onTouchTap={this.handleClose('/main/goals')} />
              <MenuItem key={'static_smart_goals'} primaryText={'S.M.A.R.T. Goals'} onTouchTap={this.handleClose('/main/home')} />
               <Divider />
              {workbooks.map((item) => (
                
                   <MenuItem key={'workbook_' + item.id} primaryText={item.title} onTouchTap={this.handleClose('/main/workbook/'+item.id)}  />

              ))}
              <Divider />
              <MenuItem key={'resources_main'} menuItems={[
                  <MenuItem key={'resources_webinar'} primaryText="Webinars" onTouchTap={this.handleClose('/main/res-webinars')}  />,
                  <MenuItem key={'resources_personal'} primaryText="Personal" onTouchTap={this.handleClose('/main/res-personal')}  />,
                  <MenuItem key={'resources_professional'} primaryText="Professional" onTouchTap={this.handleClose('/main/res-professional')}  />,
                  <MenuItem key={'resources_relationships'} primaryText="Relationships" onTouchTap={this.handleClose('/main/res-relationships')}  />,
                  <MenuItem key={'resources_spiritual'} primaryText="Spiritual" onTouchTap={this.handleClose('/main/res-spiritual')}  />

                ]} primaryText="Resources" rightIcon={<ArrowDropRight />}  />


              <Divider />
              <MenuItem key={'notes_landing'} primaryText="Notes" onTouchTap={this.handleClose('/main/notes')}  />
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
    navigateTo: (path) => {
      dispatch(push(path));
    }
  }
};
export default connect(mapStateToProp,dispatchToProp)(AppBarMenuIconDrawer);

