import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import {toggleT2AppFromMyList, showFlashMessage} from './actions';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';

const MyCheckbox = ({id, installed, title, toggleToMyApps, flashMessage}) => {
  const color = installed ? 'green' : 'white';
  const message = title + (installed ? ' has been removed from ' : ' has been added to ') + ' "My Apps"';
  var onClick = () => {
    flashMessage(message);
    toggleToMyApps(id);
  };

  return (
    <IconButton onTouchTap={onClick} >
      <CheckBox color={color} />
    </IconButton>
  );
};

const mapStateToProps = (state) => {
  return {}; // no state needed
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => {
      dispatch(toggleT2AppFromMyList(id));
    },
    flashMessage: (text) => dispatch(showFlashMessage(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCheckbox);
