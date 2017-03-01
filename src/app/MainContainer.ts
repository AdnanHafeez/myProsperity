import MainComponent from './MainComponent';
import { connect } from 'react-redux';
import {lockApplication} from './actions/security';
import {push} from 'react-router-redux';

export default connect(
  (state) => ({
    flash: state.view.flash,
    mode: state.mode
  }),
  (dispatch, ownProps) => {
    return {
      turnAppOffRedirect: (path) => {
        console.log(path);
        dispatch(push('/'));
        dispatch(lockApplication(path))
      }
    };
  }
)(MainComponent);