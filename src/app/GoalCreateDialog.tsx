
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
import {goalFactory } from './reducers/workbook';
import {WorkbookReducerInterface, GoalReducerInterface} from './data/workbook';
import {foatingButtonStyle, fullWidthDialagStyle} from './commonStyles';
import {Transforms,Validators} from './lib/helpers';

const style = {

    floatingAction: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }
};


interface MyProps {
  addGoal(goal: GoalReducerInterface): void;
  workbook: WorkbookReducerInterface;
  open: boolean;
  handleOpen(): any;
  handleClose(): any;
  goal: GoalReducerInterface;
}


interface MyState {

}

class GoalCreateDialog extends React.Component<MyProps, MyState> {



  render() {
    const {addGoal, workbook, handleClose, handleOpen, open, goal} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />,
    ];

    

    return (
      <div>
          <FloatingActionButton  onTouchTap={handleOpen} style={foatingButtonStyle as any}>
            <ContentAdd />
          </FloatingActionButton>

          <Dialog

            actions={actions}
            modal={true}
            open={open}
            onRequestClose={handleClose}
            contentStyle={fullWidthDialagStyle}
          >

          nothing here
        </Dialog>
      </div>
    );
  }
}

const stateToProps = (state) => {
  let newGoal = goalFactory(0,'');
  return {
    open: state.loadedGoalId === 0,
    goal: {...goalFactory(0,''),dueDate: null}
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
     addGoal: (goal: GoalReducerInterface) => { 
       dispatch(goalSubmitted(ownProps.workbook.id,goal)) 
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
