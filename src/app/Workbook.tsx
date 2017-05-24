
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
import GoalEditComponent from './GoalEditComponent';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {topRightButtonStyle, subMenuFlexContainerStyle, foatingButtonStyle} from './commonStyles';
import {Transforms,Validators,Formats} from './lib/helpers';

const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  settingsMenu(items: any): any;
  settingsMenuDropDown(): any;
  workbook: WorkbookReducerInterface;
  examples: any[];
  goals: GoalReducerInterface[];
  goalEditClick(goal: GoalReducerInterface): any;
  goalStatusClick(goal: GoalReducerInterface): any;
  goalDelete(workbookId:number, goalId: number): any;
  goalEdit: boolean;
  goalOpenNew():any
}

interface MyState {
  editMode: boolean;
}
class Workbook extends React.Component<MyProps, MyState> {
  componentWillMount () {
    var {workbook,examples} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
    this.state = {editMode: false}
    //this.props.settingsMenu && this.props.settingsMenu([<BasicDialog dropDown={this.props.settingsMenuDropDown} title={'Goal Examples'} items={examples} />]);
  }
  componentWillUpdate(nextProps) {
    var {workbook,examples} = nextProps;
    this.props.appBarTitle && this.props.appBarTitle(workbook.title);
    //this.props.settingsMenu && this.props.settingsMenu([<BasicDialog dropDown={this.props.settingsMenuDropDown} title={'Goal Examples'} items={examples} />]);
  }

  componentWillUnmount() {
    this.setState({editMode: false});
    //this.props.settingsMenu && this.props.settingsMenu([]);
  }

  handleEditToggle = () => {
    let newToggleState = !this.state.editMode;
    this.setState({editMode: newToggleState});
  }

  render () {
    const {goalEdit, workbook, examples, goals, goalEditClick, goalStatusClick, goalDelete, goalOpenNew} = this.props;
    let listItems;
    let actionToggleButton;
    let createNewGoalButton;
   
    if(goalEdit){
        return <GoalEditComponent workbook={workbook} goalDelete={goalDelete} />
    }


    const goalOpenEdit = (item) => {

      return (event) => {
        if(__DEVTOOLS__){
          console.log('goal edit click triggered');
        }
        goalEditClick(item);
        event.preventDefault();
        event.stopPropagation();
        
      }
    }

    const goalOpenNewClick = (event) => {
        if(__DEVTOOLS__){
          console.log('goal new click triggered');
        }
        goalOpenNew();
        event.preventDefault();
        event.stopPropagation();
    }

    const makeTitle = (item) => {

      return item.dueDate && item.dueDate > 0 ? item.title + ' - ' + Formats.msToString(item.dueDate) : item.title;
    } 
    const isPastDue = (msChallenge,msNow) => {
      return msNow > msChallenge;
    }
    const dateNow = new Date();
    const dateNowMs = dateNow.getTime();

    if(this.state.editMode){
      createNewGoalButton = null;
      actionToggleButton = <RaisedButton  primary={true} onTouchTap={this.handleEditToggle} label="Done" />;
      listItems = goals.map((item) => {
            return (<ListItem key={'edit_' + item.id} primaryText={makeTitle(item)} 
                              onTouchTap={goalOpenEdit(item)}
                              rightIcon={<EditIcon  />}  />)
          });
    }else{
      createNewGoalButton = <FloatingActionButton onTouchTap={goalOpenNewClick} style={foatingButtonStyle as any}>
                              <ContentAdd />
                            </FloatingActionButton>;


      actionToggleButton = <RaisedButton  onTouchTap={this.handleEditToggle} label="Edit Goals" />;;
      listItems = goals.map((item) => {

            return (<ListItem key={'view_' + item.id} primaryText={makeTitle(item)} 
                              onTouchTap={() => goalStatusClick(item)}
                              color='red'
                              rightIcon={item.dueDate && item.dueDate > 0 && item.dueDate < dateNowMs && item.status !== 1 ? <ErrorIcon color='red' /> : null}
                              leftIcon={item.status === 1 ? <ToggoleCheckBox color="green" /> : <ToggoleCheckBoxOutline color="grey"/>} 
                                />)
          });
    }

    return (
      <div>
        {createNewGoalButton}
        <div style={subMenuFlexContainerStyle as any}>
          <div>
            <BasicDialog title={'Examples'} items={examples} />
          </div>
          <div>
          {goals.length > 0 && actionToggleButton}
          </div>
        </div>
        <div>
          <List>
            {listItems}
          </List>
        </div>
      </div>
    );
  }
}
export default Workbook;
