
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
import ToggoleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggoleCheckBoxOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {topRightButtonStyle, subMenuFlexContainerStyle} from './commonStyles';
import {Transforms,Validators,Formats} from './lib/helpers';
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
  goalEditClick(goal: GoalReducerInterface): any;
  goalStatusClick(goal: GoalReducerInterface): any;
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
    const {workbook, isOnline, examples, goals, goalEditClick, goalStatusClick, goalDelete} = this.props;
    let listItems;
    let actionToggleButton;

    const makeTitle = (item) => {
      return item.dueDate >= 0 ? item.title + ' - ' + Formats.msToString(item.dueDate) : item.title;
    } 
    const isPastDue = (msChallenge,msNow) => {
      return msNow > msChallenge;
    }
    const dateNow = new Date();
    const dateNowMs = dateNow.getTime();

    if(this.state.editMode){
      actionToggleButton = <RaisedButton  primary={true} onTouchTap={this.handleEditToggle} label="Done" />;
      listItems = goals.map((item) => {
            return (<ListItem key={item.id} primaryText={makeTitle(item)} 
                              onTouchTap={() => goalEditClick(item)}
                              rightIcon={<EditIcon  />}  />)
          });
    }else{
      actionToggleButton = <RaisedButton  onTouchTap={this.handleEditToggle} label="Edit Goals" />;;
      listItems = goals.map((item) => {

            return (<ListItem key={item.id} primaryText={makeTitle(item)} 
                              onTouchTap={() => goalStatusClick(item)}
                              color='red'
                              rightIcon={item.dueDate >= 0 && isPastDue(item.dueDate,dateNowMs) && item.status !== 1 ? <ErrorIcon color='red' /> : null}
                              leftIcon={item.status === 1 ? <ToggoleCheckBox color="green" /> : <ToggoleCheckBoxOutline color="grey"/>} 
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
