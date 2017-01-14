import StatusIcon from './StatusIcon';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    onlineStatus: state.app.connectivity.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusIcon);
