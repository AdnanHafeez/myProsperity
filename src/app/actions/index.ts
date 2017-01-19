
export const SHOW_FLASH_MESSAGE = 'SHOW_FLASH_MESSAGE';
export const HIDE_FLASH_MESSAGE = 'HIDE_FLASH_MESSAGE';
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED';
export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';
export const GOAL_SUBMITTED = 'T2.GOAL_SUBMITTED';
export const GOAL_DELETED = 'T2.GOAL_DELETED';
export const GOAL_UPDATED = 'T2.GOAL_UPDATED';
export const GOAL_CREATE = 'T2.GOAL_CREATE';
export const GOAL_EDIT = 'T2.GOAL_EDIT';

import {nextId} from '../reducers';

export const fieldChange = (field) => {
  return {
    type: FORM_FIELD_CHANGE,
    field
  };
};

export const formSubmitted = (formId, fields) => {
  return {
    type: FORM_SUBMITTED,
    formId,
    answers: fields
  };
};

export const showFlashMessage = (text) => {
  return {
    type: SHOW_FLASH_MESSAGE,
    text
  };
};
export const hideFlashMessage = () => {
  return {
    type: HIDE_FLASH_MESSAGE
  };
};

export const goalDeleted = () => {
  return {
    type: GOAL_DELETED
  };
}

export const goalCreate = () => {
  return {
    type: GOAL_CREATE
  };
}

export const goalEdit = (id) => {
  return {
    type: GOAL_CREATE,
    id
  };
}

export const goalSubmittedWithId = (text,id) => {
  return {
    type: GOAL_SUBMITTED,
    text,
    id
  };
}
export const goalSubmitted= (text) => {
  return function(dispatch,getState){
    dispatch(goalSubmittedWithId(text, nextId(Object.keys(getState.goals))));
  }
};
export const goalUpdated= (id,text) => {
  return {
    type: GOAL_UPDATED,
    text,
    id
  };
}

export const questionAnswered = (answers) => {
  return {
    type: QUESTION_ANSWERED,
    answers
  };
};
