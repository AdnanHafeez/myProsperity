import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RadioList from './RadioList';
import {formSubmitted, fieldChange, showFlashMessage} from './actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as objectAssign from 'object-assign';

const validate = (fields,dispatch) => {
  var isValid = true;
  fields.forEach(function (field) {
    if (!field.value) {
      var tmp = objectAssign({},field,{error: 'Required'});
      dispatch(fieldChange(objectAssign({},field,{error: 'Required'})));
      isValid = false;
    } else {
      dispatch(fieldChange(objectAssign({},field,{error: ''})));
    }
  });

  return isValid;
};

function getErrors (fields, dispatch) {
  return validate(fields, dispatch);
}

const getFields = (state) => {
  return state.assessment.forms.assessmentTest.fieldIds.map((fid) => (state.assessment.forms.assessmentTest.fields[fid + '']));
};
const styles = {
  content: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItem: 'flex-start',
    padding: 10
  },
  fieldContent: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItem: 'center'
  },
  fieldItem: {
    maxWidth: 600,
    padding: 10
  },
  formActions: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between'
  }
};

interface MyProps {
  appBarTitle: any,
  formId: any,
  questions: any,
  result: any,
  fields: any,
  handleSubmit: any
  router: any,
  clearForm: any
}
interface MyState {
  handleSubmit: any,
  clearForm: any
}
class Assessment extends React.Component<MyProps,MyState> {
  componentDidMount () {
    this.props.appBarTitle && this.props.appBarTitle('Anger Assessment');
  }

  render () {
    var {fields, questions, handleSubmit, router, clearForm} = this.props;

    function getInput (field) {
      switch (questions[field.id + ''].answer.type) {
        case 'radio':
          return <RadioList field={field} choices={questions[field.id + ''].answer.inputs} />;
        default:
          return <input type='text' placeholder='placeholder test' />;
      }
    }

    return (
      <div style={styles.content as any}>
        <div>
          <p>
          Below is a list of problems and complaints that veterans sometimes have in
          response to stressful military experiences. Please read each one carefully,
          then circle one of the numbers to the right to indicate how much you have
          been bothered by that problem in the past month.
          </p>
        </div>
        <div>
          <form style={styles.fieldContent as any}>
            {fields.map((field, i) => {
              return (
                      <div style={styles.fieldItem} key={field.id}>
                        <label style={{fontWeight: 'bold'}}>{ (i + 1) + '. ' + field.title }</label>
                        <div>
                          {getInput(field)}  {field.error && <span style={{color: 'red'}}>{field.error}</span>}
                        </div>
                      </div>);
            })}
            <div style={styles.formActions as any}>
            <RaisedButton style={{margin: 10}} label="Submit" primary={true} onTouchTap={() => { handleSubmit(fields[0].formId, fields, router); }} />

            <RaisedButton style={{margin: 10}} label="Clear Form" secondary={true} onTouchTap={() => { clearForm(fields); }} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var formId = 'assessmentTest';
export default connect(
  (state, ownProps) => {
    return {
      formId,
      questions: state.assessment.questions,
      result: state.assessment.result,
      fields: getFields(state)
    };
  },
  (dispatch, ownProps) => {
    return {
      handleSubmit: (formId, fields, router) => {
        let isValid = validate(fields, dispatch);
        dispatch(formSubmitted(formId, fields));
        if (isValid) {
          router.push('/main/result');
        } else {
          dispatch(showFlashMessage('Please fix the errors highlighted above.'));
        }
      },
      clearForm: (fields) => {
        fields.forEach(function (field) {
          objectAssign(field,{value: null, error: ''});
          dispatch(fieldChange(objectAssign(field,{value: null, error: ''})));
        });
      }
    };
  }
)(withRouter(Assessment));
