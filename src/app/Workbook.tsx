
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GoalDialog from './GoalCreateDialog';
import GoalEditDialog from './GoalEditDialog';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import {WorkbookReducerInterface,GoalReducerInterface} from './data/workbook';
import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  workbook: WorkbookReducerInterface;
  examples: any[];
  goals: GoalReducerInterface[];
  isOnline: any;
  goalClick(goal: GoalReducerInterface): any;
  goalDelete(workbookId:number, goalId: number): any;
}

interface MyState {

}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    var {workbook} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
  }
  componentWillUpdate(nextProps) {
    var {workbook} = nextProps;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
  }
  render () {
    var {workbook, isOnline, examples, goals, goalClick, goalDelete} = this.props;

    return (
      <div>
        <BasicDialog title="Examples" items= {examples} />
        <List>
          {goals.map((item) => {
            return (<ListItem key={item.id} primaryText={item.title}  
                              rightIcon={<IconButton onTouchTap={() => goalDelete(workbook.id, item.id)}><DeleteIcon  /></IconButton>} 
                              leftIcon={<IconButton onTouchTap={() => goalClick(item)}><EditIcon  /></IconButton>}  />)
          })}
        </List>
        <GoalDialog workbook={workbook} />
        <GoalEditDialog workbook={workbook} />
      </div>
    );
  }
}
export default Workbook;
