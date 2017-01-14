import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { fieldChange } from './actions';
import * as objectAssign from 'object-assign';

const style = {
  container: {
    height: '80px',
    display: 'block',
    clear: 'both'
  },
  horizontal: {
    float: 'left',
    padding: '5px',
    marginLeft: '5px'
  },
  vertical: {
    padding: '5px',
    marginLeft: '5px',
    height: '10px'
  }
};

interface MyProps {
  fieldChange: any
  field: any,
  choices: any,
  deviceSize: any
}

interface MyState {
  
}


class RadioList extends React.Component<MyProps, MyState> {

  constructor (props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event, index, newValue) {
    var {fieldChange} = this.props;
    var field = this.props.field;

    if (field.value !== newValue) {
      var newField = objectAssign(field, {value: newValue, error: ''});
      fieldChange(newField);
    }
  }

  render () {
    var {choices} = this.props;
    var {value} = this.props.field;

    return (
           <SelectField value={value} onChange={this.handleChange}>
                  <MenuItem key={0} disabled={value !== null} value={null} primaryText="Select One" />
             {choices.map(function (choice, i) {
               return (
                   <MenuItem key={i + 1} value={choice.value} primaryText={choice.title} />
                 );
             })}
           </SelectField>
      );
  }

}

const mapStateToProps = (state,ownProps) => {
  return {
    deviceSize: state.device.size
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fieldChange: (field) => (dispatch(fieldChange(field)))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RadioList);
