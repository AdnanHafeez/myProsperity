import Workbook from './Workbook';
import { connect } from 'react-redux';
import {goalLoad} from './actions';
import {WorkbookReducerInterface, GoalReducerInterface, GoalFormItemInterface} from './data/workbook';
const mapStateToProps = (state, ownProps) => {
  return {
    workbook: state.workbooks[ownProps.params.id],
    examples: state.workbooks[ownProps.params.id].examples.map((eid) => (state.examples[eid + ''])),
    goals: state.workbooks[ownProps.params.id].goals.map((eid) => (state.goals[eid + ''])),
    isOnline: true
  };
};

const dispatchToProps = (dispatch) => {
  return {
    goalClick: (goal: GoalReducerInterface) => dispatch(goalLoad(goal.id))
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Workbook);
