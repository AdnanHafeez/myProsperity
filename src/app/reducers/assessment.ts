import {combineReducers} from 'redux';
import { normalize, schema } from 'normalizr';
import {
  FORM_FIELD_CHANGE,
  FORM_SUBMITTED
} from '../actions';
import * as objectAssign from 'object-assign';
const questionSchema = new schema.Entity('questions');

questionSchema.define({
});

const fieldsSchema = new schema.Entity('fields');

fieldsSchema.define({});

const fieldsListSchema = new schema.Array(fieldsSchema);
const questionListSchema = new schema.Array(questionSchema);
export const assessmentConfig = {
  maxScore: 56.0,
  scoring: [
    {id: 1, min: 0, max: 22, title: 'Your score is in a range typically associated with LOW anger.', conclusion: 'Although only a healthcare professional can provide an actual diagnosis, your results suggest that you don’t seem to be having difficulties with anger right now.'
    },
    {id: 2, min: 23, max: 42, title: 'Your score is in a range typically associated with MODERATE anger.', conclusion: 'Although only a healthcare professional can provide an actual diagnosis, anger may be causing significant problems in your relationships, your work, and your health.'
    },
    {id: 3, min: 43, max: 56, title: 'Your score is in a range typically associated with HIGH anger.', conclusion: 'Although only a healthcare professional can provide an actual diagnosis, your responses suggest you may be feeling angry often or having problems controlling your anger.'
    }
  ]
};

function makeRadios () {
  return {
    type: 'radio',
    inputs: [
      {title: '0 - Not at all', value: '1', score: 0},
      {title: '1', value: '2', score: 1},
      {title: '2', value: '3', score: 2},
      {title: '3', value: '4', score: 3},
      {title: '4', value: '5', score: 4},
      {title: '5', value: '6', score: 5},
      {title: '6', value: '7', score: 6},
      {title: '7', value: '8', score: 7},
      {title: '8 - Exactly So', value: '9', score: 8}
    ]
  };
}

function ratioComplete (answers) {
  const {numAnswered, total} = countCompleted(answers);
  return numAnswered / total;
}
function percentComplete (answers) {
  return ratioComplete(answers) * 100;
}

function scaleRatio (answers) {
  return tallyScore(answers) / assessmentConfig.maxScore;
}

function countCompleted (answers) {
  var count = 0;
  var totalCount = 0;
  Object.keys(answers).map(function (v) {
    if (answers[v]) {
      count++;
    }
    totalCount++;
  });
  return {numAnswered: count, total: totalCount};
}

function tallyScore (answers) {
  if (ratioComplete(answers) < 1) {
    return 0; // assessment incomplete
  }
  var total = 0;
  Object.keys(answers).map(function (v) {
    answers[v].answer.inputs.forEach(function (ans) {
      if (ans.value === answers[v].value) {
        total += parseInt(ans.score);
      }
    });
  });
  return total;
}

function getScore (answers) {
  var tally = tallyScore(answers);

  return assessmentConfig.scoring.filter(function (criteria) {
    if (criteria.min <= tally && criteria.max >= tally) {
      return true;
    }
    return false;
  })[0] || assessmentConfig.scoring[0];
}

const apiQuestions = [
  {id: 1, title: 'I often find myself getting angry at people or situations.', type: 'text', answer: makeRadios()},
  {id: 2, title: 'When I get angry, I get really mad.', type: 'text', answer: makeRadios()},

  {id: 3, title: 'When I get angry, I stay angry.', type: 'text', answer: makeRadios()},
  {id: 4, title: 'When I get angry at someone, I want to hit or clobber the person.', type: 'text', answer: makeRadios()},

  {id: 5, title: 'My anger interferes with my ability to get my work done.', type: 'text', answer: makeRadios()},
  {id: 6, title: 'My anger prevents me from getting along with people as well as I would like to.', type: 'text', answer: makeRadios()},
  {id: 7, title: 'My anger has a bad effect on my health.', type: 'text', answer: makeRadios()}
];

const appTree = {
  questions: apiQuestions
};

function generateForm (formId, ids, ob) {
  let fields = ids.map((qid) => {
    let question = ob[qid + ''];
    return {
      id: question.id + '',
      title: question.title,
      touched: false,
      error: '',
      value: null,
      answer: question.answer,
      formId
    };
  });
  const normFields = normalize(fields, fieldsListSchema);
  return {
    [formId]: {
      id: formId + '',
      fields: normFields.entities.fields,
      fieldIds: normFields.result
    }
  };
}

const questionItems = normalize(appTree.questions, questionListSchema);

export const questions = (state = questionItems.entities.questions, action) => {
  return state;
};

export const questionIds = (state = questionItems.result, action) => {
  return state;
};

export const result = (state = 0.5, action) => {
  switch (action.type) {
    case FORM_SUBMITTED:
      return tallyScore(action.answers);
  }
  return state;
};

export const resultDetails = (state = assessmentConfig.scoring[0], action) => {
  switch (action.type) {
    case FORM_SUBMITTED:
      return getScore(action.answers);
  }
  return state;
};

const formDefault = generateForm(
            'assessmentTest',
            questionItems.result,
            questionItems.entities.questions
          );

export const forms = (state = formDefault, action) => {
  switch (action.type) {
    case FORM_FIELD_CHANGE:
      if (__DEVTOOLS__) {
        console.log('CALLING: ' + FORM_FIELD_CHANGE);
      }

      if (typeof state[action.field.formId] !== null &&
        typeof state[action.field.formId].fields[action.field.id].value !== 'undefined') {
        if (__DEVTOOLS__) {
          console.log('UPDATING: ' + FORM_FIELD_CHANGE);
          console.log(action.field);
        }
        state[action.field.formId].fields[action.field.id].value = action.field.value;
        state[action.field.formId].fields[action.field.id].error = action.field.error;

        state[action.field.formId].fields[action.field.id] = objectAssign({}, state[action.field.formId].fields[action.field.id]);
        return objectAssign({}, state);
      } else if (__DEVTOOLS__) {
        console.log('Field change missed');
      }
    case FORM_SUBMITTED:
      break;
  }
  return state;
};

const Assessments = combineReducers({
  questions,
  questionIds,
  result,
  resultDetails,
  forms
});

export default Assessments;
