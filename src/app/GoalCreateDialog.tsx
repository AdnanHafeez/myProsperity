
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GoalForm from './GoalForm';
import {connect} from 'react-redux';
import {goalSubmitted,goalEdit,goalLoad} from './actions';

import {WorkbookReducerInterface} from './data/workbook';


interface GoalFormItemInterface {
  goal: string;
}

interface MyProps {
  addGoal(goal: GoalFormItemInterface): void;
  workbook: WorkbookReducerInterface;
  open: boolean;
  handleOpen(): any;
  handleClose(): any;
}

interface MyState {

}

class GoalCreateDialog extends React.Component<MyProps, MyState> {


  render() {
    const {addGoal, workbook, handleClose, handleOpen, open} = this.props;

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
          <FloatingActionButton  onTouchTap={handleOpen} style={{
                                        marginRight: 20,
                                      }}>
            <ContentAdd />
          </FloatingActionButton>

          <Dialog
            title="Create a Goal"
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={handleClose}
          >

          <GoalForm onSubmit={addGoal} workbook />
        </Dialog>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    open: state.loadedGoalId === 0,
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
     addGoal: (goal: GoalFormItemInterface) => { 
       dispatch(goalSubmitted(ownProps.workbook.id,goal.goal)) 
       dispatch(goalLoad(-1)); //resets and closes form
     },
     handleOpen: () => {
       dispatch(goalLoad(0))
     },
     handleClose: () => {
       dispatch(goalLoad(-1))
     }
  }
}
export default connect(stateToProps,dispatchToProps)(GoalCreateDialog);
