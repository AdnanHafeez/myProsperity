
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
export const GOAL_LOAD= 'T2.GOAL_LOAD';
export const NOTE_LOAD = 'T2.NOTE_LOAD';
export const NOTE_EDIT = 'T2.NOTE_EDIT';
export const NOTE_CREATE = 'T2.NOTE_CREATE';
export const NOTE_DELETE = 'T2.NOTE_DELETE';

import {WorkbookReducerInterface, GoalReducerInterface, GoalFormItemInterface, NoteFormItemInterface, NoteReducerInterface} from '../data/workbook';
import {nextId} from '../reducers';
import {goalFactory} from '../reducers/workbook';
import {noteFactory} from '../reducers/note';
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

export const goalCreate = () => {
  return {
    type: GOAL_CREATE
  };
}

export const goalLoad = (id: number) => {
  return {
    type: GOAL_LOAD,
    id
  }
}

export const noteLoad = (id: number) => {
  return {
    type: NOTE_LOAD,
    id
  }
}

export const noteEdit = (id, note: NoteFormItemInterface): {type:string, note: NoteReducerInterface} => {
  return {
    type: NOTE_EDIT,
    note: noteFactory(id,note.note)
  };
}

export const noteDelete = (id): {type:string, id: number} => {
  return {
    type: NOTE_DELETE,
    id
  };
}


export const noteAdd = (note: NoteReducerInterface): {type:string, note: NoteReducerInterface} => {
  return {
    type: NOTE_CREATE,
    note: note
  };
}

export const noteCreate = (note: NoteFormItemInterface) => {
  return function(dispatch,getState){
    let newNote = noteFactory(nextId(Object.keys(getState().notes)),note.note);
    dispatch(
      noteAdd(newNote)
    );
  }
};

export const goalEdit = (workbookId,goalId, goal: GoalFormItemInterface): {type:string, goal: GoalReducerInterface, workbookId: number} => {
  return {
    type: GOAL_EDIT,
    goal: goalFactory(goalId, goal.goal),
    workbookId
  };
}
export const goalSubmittedWithId = (workbookId,text,id) => {
  return {
    type: GOAL_SUBMITTED,
    text,
    workbookId,
    id
  };
}
export const goalSubmitted= (workbookId: number, text: string) => {
  return function(dispatch,getState){
    dispatch(goalSubmittedWithId(workbookId, text, nextId(Object.keys(getState().goals))));
  }
};

export const goalUpdated= (id,text) => {
  return {
    type: GOAL_UPDATED,
    text,
    id
  };
}

export const goalDeleted = (workbookId, id) => {
   return {
     type: GOAL_DELETED,
     id,
     workbookId
   }
}
export const questionAnswered = (answers) => {
  return {
    type: QUESTION_ANSWERED,
    answers
  };
};