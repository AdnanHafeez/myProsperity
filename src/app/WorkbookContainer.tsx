import Workbook from './Workbook';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    workbook: state.workbooks[ownProps.params.id],
    examples: state.workbooks[ownProps.params.id].examples.map((eid) => (state.examples[eid + ''])),
    isOnline: true
  };
};

export default connect(
  mapStateToProps
)(Workbook);
