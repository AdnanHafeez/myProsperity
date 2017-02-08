import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import {Transforms,Validators} from './lib/helpers';
import {topRightButtonStyle} from './commonStyles'
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
        if(values.dueDate !== null && !Validators.isNumeric(values.dueDate)){
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
}

interface MyState {
   dueDateChecked: boolean;
   errors: GoalFormInterface;
   values: GoalFormInterface;
}
export default class GoalForm extends React.Component<MyProps, MyState>{
  constructor (props, context) {
    super(props, context);
    console.log(props.goal);

    this.state = {
      dueDateChecked: Validators.isDate(props.goal.dueDate),
      errors: {title: '', dueDate: ''},
      values: {title: props.goal.title, dueDate: props.goal.dueDate}
    };
  }
  componentDidMount(){
    (this as any).textInput.focus();
  }
  handleChange = (event) => {
    console.log("Change event");
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
      console.log('handleDateChange');
      console.log(date);
      this.setState({
        values: {...this.state.values,[name]: Transforms.dateToMS(date,null)}
      } as any);
    }
  }

  handleDueDateCheck = (event, isInputChecked) => {
    if(!isInputChecked){
      this.setState({
        values: {...this.state.values,dueDate: null},
        dueDateChecked: isInputChecked
      } as any);
    }else{
      this.setState({
        dueDateChecked: isInputChecked
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
  render(){
    console.log('------');
    console.log(this.props.goal.dueDate);
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      
        <div style={topRightButtonStyle}>
          <RaisedButton type="submit" label="Save" />
        </div>
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
            <CalendarToggle 
              date={this.state.values.dueDate} 
              label="Set Due Date" 
              dueDateChecked={this.handleDueDateCheck}
              checked={this.state.dueDateChecked}
              />
          </div>
          <div>
            <DatePicker 
                value={Transforms.msToDate(this.state.values.dueDate)}
                hintText="Due Date" 
                locale={'en-US'}
                errorText={this.state.errors.dueDate}
                onChange={this.handleDateChange('dueDate')}
                disabled={!this.state.dueDateChecked} 
                name='dueDate'
                autoOk={false} />
          </div>
        </div>

      
      </form>
      </div>
    );
  }
}
