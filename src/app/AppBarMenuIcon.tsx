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
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
/**
 * AppBarMenuIcon provides the left icon in the top navigation bar
 * @param  {[type]} options.paths   [description]
 * @param  {[type]} options.submenu [description]
 * @param  {[type]} options.parent  [description]
 * @return {[type]}                 [description]
 */

const AppBarMenuIcon = ({paths, submenu, parent, workbooks}) => {
  if (paths.current.level > 1) {
    if (parent) {
      return (<Link to={parent.pathname}><IconButton><ArrowBack /></IconButton></Link>);
    }
    return (<Link to="/main/home"><IconButton><ArrowBack /></IconButton></Link>);
  }

  

    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MenuIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        >

        {submenu.filter((item) => (item.display)).map((item) => (
           <MenuItem key={'menu_' + item.id} primaryText={item.name} containerElement={<Link to={item.pathname} />} />
        ))}
        <MenuItem key={'static_smart_goals'} primaryText={'S.M.A.R.T. Goals'} containerElement={<Link to='/main/home' />} />
        {workbooks.map((item) => (
           <MenuItem key={'workbook_' + item.id} primaryText={item.title} containerElement={<Link to={'/main/workbook/'+item.id} />}  />
        ))}
        <MenuItem key={'notes_landing'} primaryText="Notes" containerElement={<Link to={'/main/notes'} />}  />
      </IconMenu>);
 
};

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
export default connect(mapStateToProp,dispatchToProp)(AppBarMenuIcon);

