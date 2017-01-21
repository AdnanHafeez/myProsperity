import {wbData} from '../data/workbook';
import { normalize, schema } from 'normalizr';
import * as objectAssign from 'object-assign';
import {NoteReducerInterface} from '../data/workbook';


import {NOTE_LOAD,NOTE_EDIT,NOTE_CREATE,NOTE_DELETE} from '../actions';


export const noteFactory = (id: number, text: string): NoteReducerInterface => {
  return {
    id,
    text
  }
}

function checkProperty(ob,prop){
        if(typeof ob[ prop + ''] === 'undefined'){
          if(__DEVTOOLS__){
            console.log("Invalid workbook id submitted to reducer");
          }
          return false;
        }
        return true;
}


export const notes = (state = {},action) => {
  switch(action.type){
    case NOTE_EDIT:
      if(!checkProperty(state,action.note.id)){
        return state;
      }
      state[action.note.id + ''] = action.note
      state = objectAssign({},state);
      break;
    case NOTE_CREATE:
      if(action.note.id){
        state[action.note.id + ''] = action.note
        state = objectAssign({},state);
      }
      break;
    case NOTE_DELETE:
      delete state[action.id + ''];
      state = objectAssign({},state);
      break;
  }
  return state;
}
export const noteIds = (state = [], action) => {
  switch(action.type){
    case NOTE_CREATE:
      if(action.note.id){
        state.push(action.note.id);
        state = state.map(id => id);
      }
      break;
    case NOTE_DELETE:
      state = state = state.filter(id => action.id !== id);
      break;
  }
  return state;
}

export const loadedNoteId = (state = -1,action) => {
  switch(action.type){
    case NOTE_LOAD:
      state = action.id;
      break;
  }
  return state;
}



