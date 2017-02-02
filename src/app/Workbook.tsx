
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GoalCreateDialog from './GoalCreateDialog';
import GoalEditDialog from './GoalEditDialog';
import {connect} from 'react-redux';
import BasicDialog from './BasicDialog';
import {WorkbookReducerInterface,GoalReducerInterface} from './data/workbook';
import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import DoneIcon from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {topRightButtonStyle, subMenuFlexContainerStyle} from './commonStyles';
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
  editMode: boolean;
}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    var {workbook} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
    this.state = {editMode: false}
  }
  componentWillUpdate(nextProps) {
    var {workbook} = nextProps;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
  }

  componentWillUnmount() {
    this.setState({editMode: false});
  }

  handleEditToggle = () => {
    let newToggleState = !this.state.editMode;
    this.setState({editMode: newToggleState});
  }

  render () {
    const {workbook, isOnline, examples, goals, goalClick, goalDelete} = this.props;
    let listItems;
    let actionToggleButton;
    if(this.state.editMode){
      actionToggleButton = <RaisedButton  primary={true} onTouchTap={this.handleEditToggle} label="Done" />;
      listItems = goals.map((item) => {
            return (<ListItem key={item.id} primaryText={item.title}  
                              onTouchTap={() => goalClick(item)}
                              rightIcon={<EditIcon  />}  />)
          });
    }else{
      actionToggleButton = <RaisedButton  onTouchTap={this.handleEditToggle} label="Edit Goals" />;;
      listItems = goals.map((item) => {
            return (<ListItem key={item.id} primaryText={item.title}  
                              rightIcon={<DoneIcon  />} 
                                />)
          });
    }

    return (
      <div>
        <div style={subMenuFlexContainerStyle as any}>
          <div>
          <BasicDialog title="Examples" items= {examples} />
          </div>
          <div>
          {actionToggleButton}
          </div>
        </div>
        <div>
          <List>
            {listItems}
          </List>
          <GoalCreateDialog workbook={workbook} />
          <GoalEditDialog workbook={workbook} goalDelete={goalDelete} />
        </div>
      </div>
    );
  }
}
export default Workbook;
