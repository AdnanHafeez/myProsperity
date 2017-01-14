import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {showFlashMessage} from './actions';
import * as objectAssign from 'object-assign';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '10px'
  },
  desktop: {
  }
};

const Connectivity = (props) => {
	var {isOnline,flashMessage} = props;
	return (
		<div>
			{React.cloneElement(props.children, objectAssign({ isOnline },props))}
		</div>
		)
}




const mapStateToProps = (state,ownProps) => {
  return {
    isOnline: state.app.connectivity.status === 1
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connectivity);