import Workbook from './Workbook';
import { connect } from 'react-redux';
import {goalLoad, goalDeleted, goalToggleStatus} from './actions';
import {WorkbookReducerInterface, GoalReducerInterface, GoalFormItemInterface} from './data/workbook';
import {Validators} from './lib/helpers'



const getGoalArray = (goalIds,goalsObject) => {
    return goalIds.map((id) => goalsObject[id + ''])
}
const filterNoDateAndIncomplete = (goalIds,goalsObject) => {
  return getGoalArray(goalIds,goalsObject).filter((goal) => {
      //is Complete so we don't want it
      if(goal.status === 1){
        return false;
      }
      //has date so we don't want it
      if(Validators.isNumeric(goal.dueDate) && goal.dueDate > 0){
        return false;
      }
      return true;
  });
}


const filterNoDateAndComplete = (goalIds,goalsObject) => {
  return getGoalArray(goalIds,goalsObject).filter((goal) => {
      //is Complete so we don't want it
      if(goal.status === 1){
        return false;
      }
      //has date so we don't want it
      if(Validators.isNumeric(goal.dueDate) && goal.dueDate > 0){
        return false;
      }
      return true;
  });
}

const filterComplete = (goalIds,goalsObject) => {
  return getGoalArray(goalIds,goalsObject)
            .filter((goal) => {
                //is InComplete so we don't want it
                if(goal.status !== 1){
                  return false;
                }
                return true;
            });
}

const filterHasDateAndIncomplete = (goalIds,goalsObject) => {
  return sortByMsDate(
            getGoalArray(goalIds,goalsObject)
            .filter((goal) => {
                //is Complete so we don't want it
                if(goal.status === 1){
                  return false;
                }
                //has no date so we don't want it
                if(!Validators.isNumeric(goal.dueDate)){
                  return false;
                }
                return true;
            })
          );
}

const filterPastDueIncomplete = (goalIds,goalsObject) => {
    const currentDate = new Date();
    const currentMs = currentDate.getTime();
    return filterHasDateAndIncomplete(goalIds,goalsObject).filter((goal) => {
          if(goal.dueDate > currentMs){
            return false;
          }
          return true;
    });
}

const filterCommingDueIncomplete = (goalIds,goalsObject) => {
    const currentDate = new Date();
    const currentMs = currentDate.getTime();
    return filterHasDateAndIncomplete(goalIds,goalsObject).filter((goal) => {
          if(goal.dueDate < currentMs){
            return false;
          }
          return true;
    });
}

const sortByMsDate = (goalsArray,direction = 'asc') => {
  return goalsArray.sort(function(a,b){
      if(a.dueDate < b.dueDate){
        return -1;
      }
      if(a.dueDate > b.dueDate){
        return 1;
      }
      return 0;
  });
}

const concatAllGoals = (goalIds,goalOb) => {
          /* list first */
console.log(filterPastDueIncomplete(goalIds,goalOb));
  console.log(filterCommingDueIncomplete(goalIds,goalOb));
  console.log(filterNoDateAndIncomplete(goalIds,goalOb));
  console.log(filterComplete(goalIds,goalOb));
  return filterPastDueIncomplete(goalIds,goalOb).
            concat(
              /* list second */
                filterCommingDueIncomplete(goalIds,goalOb),
              /* list third */
                filterNoDateAndIncomplete(goalIds,goalOb),
              /* list fourth */
                filterComplete(goalIds,goalOb),
              );

};
const mapStateToProps = (state, ownProps) => {
  return {
    workbook: state.workbooks[ownProps.params.id],
    examples: state.workbooks[ownProps.params.id].examples.map((eid) => (state.examples[eid + ''])),
    goals: concatAllGoals(state.workbooks[ownProps.params.id].goals,state.goals),
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
