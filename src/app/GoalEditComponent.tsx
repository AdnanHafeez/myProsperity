
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {WorkbookReducerInterface, GoalReducerInterface, GoalFormItemInterface} from './data/workbook';
import GoalForm from './GoalForm';
import {connect} from 'react-redux';
import {goalEdit,goalLoad,goalSubmitted} from './actions';
import {goalFactory} from './reducers/workbook'
import {foatingButtonStyle, fullWidthDialagStyle} from './commonStyles';
import {Transforms,Validators} from './lib/helpers';

interface MyProps {
  editGoal?(goal: GoalReducerInterface): any;
  handleClose?(): any;
  goal?: GoalReducerInterface;
  workbook: WorkbookReducerInterface;
  goalDelete(workbookId:number,goalId:number): any;
}

interface MyState {

}

class GoalEditComponent extends React.Component<MyProps, MyState> {
  render() {
    const {editGoal, goalDelete, handleClose, goal, workbook} = this.props;
    return (<GoalForm goalDelete={goalDelete} handleClose={handleClose} workbook={workbook} goal={goal} submitData={editGoal(goal)} />)
  }
}

const getGoal = (loadedGoalId, goals) => {
  let goal = goalFactory(0,'');
  if(typeof goals[loadedGoalId + ''] !== 'undefined'){
    goal = goals[loadedGoalId + ''];
  }
  return goal;
}
const stateToProps = (state) => {

  return {
    goal: getGoal(state.loadedGoalId, state.goals)
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
     editGoal: (goal) => { 
       return (goal: GoalReducerInterface) => {
         if(goal.id){
            dispatch(goalEdit(ownProps.workbook.id,
                 goal.id,
                 goal));
         } else {
           dispatch(goalSubmitted(ownProps.workbook.id,goal)) 
         }
         dispatch(goalLoad(-1));
       }
     },
     handleClose: () => {
       dispatch(goalLoad(-1));
     }
  }
}

export default connect(stateToProps,dispatchToProps)
(GoalEditComponent);

