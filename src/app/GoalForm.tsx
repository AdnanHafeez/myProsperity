import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import {Transforms,Validators} from './lib/helpers';
import {subMenuFlexContainerStyle} from './commonStyles'
import {GoalReducerInterface, WorkbookReducerInterface} from './data/workbook';
interface GoalFormInterface {
  title: string;
  dueDate: any;
}
const validateForm = (values:{title: string,dueDate: any}): any => {
  let fields = Object.keys(values).reduce((accum,current) => {
                                               accum[current] = '';
                                               return accum;
                                            },{});


  const results = {...{fields},isValid: false, errorMessage: ''};
  let isFormValid = true;
  Object.keys(fields).map(function(propName){
    switch(propName){
      case 'title':
        if(values.title.length === 0){
          results.fields[propName] = 'Required.'
        }
        break;
      case 'dueDate':
        if(!Validators.isNumeric(values.dueDate) || values.dueDate === -1){
          results.fields[propName] = 'Please select a date.'
        }
        break;
      default: //unexpected value
        results.errorMessage = 'Unexpected form field "' + propName +'".'
    }
    if(results.fields[propName].length > 0){
       isFormValid = false;
    }
  });
  results.isValid = isFormValid && results.errorMessage.length === 0;

  return results;
}

const CalendarToggle = (props) => {
  const {checked,label,dueDateChecked} = props;

  return <Checkbox onCheck={dueDateChecked} checked={checked} label={label} />;
}






interface MyProps {
  goal: GoalReducerInterface;
  workbook: WorkbookReducerInterface;
  submitData(goal: GoalReducerInterface): any;
  handleClose?():any;
  goalDelete(workbookId:number,goalId:number): any;
}

interface MyState {
   errors: GoalFormInterface;
   values: GoalFormInterface;
}






export default class GoalForm extends React.Component<MyProps, MyState>{
  constructor (props, context) {
    super(props, context);
    console.log(props.goal);

    this.state = {
      errors: {title: '', dueDate: ''},
      values: {title: props.goal.title, dueDate: props.goal.dueDate}
    };
  }

  componentWillUnmount(){

    (this as any).textInput.blur();
  }

  handleChange = (event) => {
   
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      values: {...this.state.values,[name]: value},
      errors: {...this.state.errors,[name]: ''}
    } as any);
  }


  handleDateChange = (name) => {
    return (event, date) => {

      this.setState({
        values: {...this.state.values,[name]: Transforms.dateToMS(date,null)}
      } as any);
    }
  }


  handleSubmit = (event) => {
    const {submitData} = this.props;
    const result = validateForm(this.state.values);

    if(result.isValid){
      let data = {...this.state.values,id: this.props.goal.id}
      submitData(data);
    }
    
    this.setState({
      errors: {...result.fields}
    } as any);
    
    event.preventDefault();
  }
  excuseKeyboard = (event) => {
      event.target.focus();
  }

  render(){
    const {handleClose,workbook,goal,goalDelete} = this.props
    let deleteButton = null;
    if(goal.id > 0){
      deleteButton = <RaisedButton onTouchTap={() => goalDelete(workbook.id,goal.id)} label="delete" />;
    }

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      

        <div>
        <TextField 
              floatingLabelText={'Goal'} 
              hintText={'Enter Text Here'} 
              multiLine={true}
              rows={1}
              rowsMax={2}
              name='title'
              value={this.state.values.title}
              fullWidth={true}
              onChange={this.handleChange}
              ref={(input) => { (this as any).textInput = input; }}
              errorText={this.state.errors.title} />
        </div>
        <div>
          <div>
            <DatePicker 
                value={Transforms.msToDate(this.state.values.dueDate)}
                floatingLabelText={'Due Date'}
                locale={'en-US'}
                firstDayOfWeek={0}
                errorText={this.state.errors.dueDate}
                onChange={this.handleDateChange('dueDate')}
                onTouchTap={this.excuseKeyboard}
                name='dueDate'
                autoOk={false} />
          </div>
        </div>
        <div style={subMenuFlexContainerStyle as any}>
          <div>
          <RaisedButton primary={true} type="submit" label="Save" />
          </div>
          <div>
            {deleteButton}
          </div>
          <div>
          <RaisedButton onTouchTap={handleClose} type="button" label="Cancel" />
          </div>
        </div>
      
      </form>
      </div>
    );
  }
}
