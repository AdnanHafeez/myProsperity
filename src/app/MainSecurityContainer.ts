import MainComponent from './MainComponent';
import { connect } from 'react-redux';


const stateToProps = (state) => {
  return {
    isAuthed: state.sUser.isAuthenticated
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
      authToggle: (authed) => {
      },
      dispatch: dispatch
  }
}

export default connect(
stateToProps,
dispatchToProps
)(MainComponent);