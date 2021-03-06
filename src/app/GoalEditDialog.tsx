
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {WorkbookReducerInterface, GoalReducerInterface, GoalFormItemInterface} from './data/workbook';
import GoalForm from './GoalForm';
import {connect} from 'react-redux';
import {goalEdit,goalLoad} from './actions';
import {goalFactory} from './reducers/workbook'



interface MyProps {
  editGoal(goal: GoalReducerInterface): any;
  open: boolean;
  handleClose(): any;
  goal: GoalReducerInterface;
  workbook: WorkbookReducerInterface;
}

interface MyState {

}

class GoalEditDialog extends React.Component<MyProps, MyState> {


  render() {
    const {editGoal, open, handleClose, goal, workbook} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={handleClose}
      />,
    ];

    return (
      <div>
    
        <Dialog
          title="Edit Goal"
          actions={actions}
          modal={true}
          open={open}
          onRequestClose={handleClose}
        >

          <GoalForm workbook={workbook} goal={goal} handleSubmit={editGoal(goal)} />
        </Dialog>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    open: state.loadedGoalId > 0,
    goal: state.loadedGoalId > 0 ? state.goals[state.loadedGoalId + ''] : goalFactory(0,'')
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
     editGoal: (goal) => { 
       return (goal: GoalReducerInterface) => {
         dispatch(goalEdit(ownProps.workbook.id,goal.id,goal)) 
         dispatch(goalLoad(-1));
       }
     },
     handleClose: () => {
       dispatch(goalLoad(-1));
     }
  }
}
export default connect(stateToProps,dispatchToProps)(GoalEditDialog);