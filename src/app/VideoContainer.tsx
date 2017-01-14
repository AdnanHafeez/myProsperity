import Video from './Video';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.videos[ownProps.params.id],
    isOnline: state.app.connectivity.status === 1
  };
};

export default connect(
  mapStateToProps
)(Video);
