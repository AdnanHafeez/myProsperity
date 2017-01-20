
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GoalDialog from './GoalCreateDialog';
import GoalEditDialog from './GoalEditDialog';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import {WorkbookReducerInterface,GoalReducerInterface} from './data/workbook';
import {List, ListItem} from 'material-ui/List';


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
}

interface MyState {

}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    var {workbook} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
  }
  render () {
    var {workbook, isOnline, examples, goals, goalClick} = this.props;

    return (
      <div>
        <BasicDialog title="Examples" items= {examples} />
        <List>
          {goals.map((item) => (<ListItem key={item.id} primaryText={item.title} onTouchTap={() => goalClick(item)} />))}
        </List>
        <GoalDialog workbook={workbook} />
        <GoalEditDialog workbook={workbook} />
      </div>
    );
  }
}
export default Workbook;
