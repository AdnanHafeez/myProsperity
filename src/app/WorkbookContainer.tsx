import Workbook from './Workbook';
import { connect } from 'react-redux';
import {goalLoad, goalDeleted, goalToggleStatus} from './actions';
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
    goalEditClick: (goal: GoalReducerInterface) => dispatch(goalLoad(goal.id)),
    goalStatusClick: (goal: GoalReducerInterface) => {
      dispatch(goalToggleStatus(goal));
    },
    goalDelete: (workbookId,goalId: number) => {
      dispatch(goalDeleted(workbookId,goalId))
    }
  }
}

export default connect(
  mapStateToProps,
  dispatchToProps
)(Workbook);
