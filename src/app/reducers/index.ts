import {combineReducers} from 'redux';
import {view} from './view';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import {REHYDRATE} from 'redux-persist/constants';

import {deviceReducer} from 'local-t2-device-redux';
import {navigationReducer} from 'local-t2-navigation-redux';

import {workbooks,workbookIds, examples, goals,loadedGoalId} from './workbook';
import {notes, noteIds, loadedNoteId} from './note';
import {user,
  pinQuestions,
  pinQuestionIds,
  rikey,
  selectedPinQuestionIds,
  questionAnswers,
  cordova} from './security';
import {LOCK_APPLICATION,UNLOCK_APPLICATION} from '../actions/security'



export interface GoalInterface {
  id: string;
  name: string;
  date: string;
}

export interface GoalTreeInterface {
  [propName: string]: GoalInterface;
}



function migrations (state = {}, action) {
  return state;
}

function mode(state = 0, action) {
  switch(action.type){
    case LOCK_APPLICATION:
      state = 0;
      break;
    case UNLOCK_APPLICATION:
      state = 1;
      break;
  }
  return state;
}

const onLogOutDefault = {
  redirect: '/'
}
function onLogout(state = onLogOutDefault, action){
  switch(action.type){
    case LOCK_APPLICATION:
      state = {...state,redirect: action.redirect};
      break;
  }
  return state;
}



export const getMax = function(array){
  return Math.max.apply(null,array);
}

export const nextId = (array) => {
  let nextId = array.length ? getMax(array) + 1 : 1;
  return nextId;
}

const appHub = combineReducers({
  /* security states start */
  user,
  pinQuestions,
  pinQuestionIds,
  rikey,
  selectedPinQuestionIds,
  questionAnswers,
  cordova,

  /* security states end */

  migrations,
  form: formReducer,
  routing: routerReducer,
  view,
  device: deviceReducer,
  navigation: navigationReducer,
  workbooks,
  workbookIds,
  examples,
  goals,
  loadedGoalId,
  notes,
  noteIds,
  loadedNoteId,
  mode,
  onLogout
});

const rootReducer = (state, action) => {
 
 if (action.type === REHYDRATE) {
    if(__DEVTOOLS__){
      console.log(action.payload);
      console.log(state);
    }

    state = Object.assign({},state,action.payload);
    if(__DEVTOOLS__){
      console.log(state);
    }
  }

  return appHub(state, action)
}

export default rootReducer;
