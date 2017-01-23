import {combineReducers} from 'redux';
import {view} from './view';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import {REHYDRATE} from 'redux-persist/constants';

import {deviceReducer} from 'local-t2-device-redux';
import {navigationReducer} from 'local-t2-navigation-redux';
import {appReducer} from 'local-t2-app-redux';
import * as objectAssign from 'object-assign';
import {workbooks,workbookIds, examples, goals,loadedGoalId} from './workbook';
import {notes, noteIds, loadedNoteId} from './note';
import {USER_LOGIN, USER_LOGOUT} from '../actions'
/*
* The data below could come from a rest server
*/
const defaultUser = {
  stage: 0,
  loaded: 0,
  role: 'anonymous',
  firstname: '',
  lastname: '',
  isAuthenticated: true,
  pin: '',
  firstQuestionAnwser: '',
  secondQuestionAnwser: '' // etc, etc //TODO implement pin lock system
};

interface GoalInterface {
  id: string;
  name: string;
  date: string;
}
interface GoalTreeInterface {
  [propName: string]: GoalInterface;
}


/**
 * Redux State functions
 */

/**
 * Controlls the user state
 * @param object state the user's current state
 * @param object action The action that this function may respond to
 *
 * @return object the new state or the current state
 */

function user (state = defaultUser, action) {
  switch (action.type) {
    case REHYDRATE:
      break;
    case USER_LOGIN:
      state = objectAssign({},state,{isAuthenticated: true});
      break;
    case USER_LOGOUT:
      state = objectAssign({},state,{isAuthenticated: false});
      break;
  }
  return state;
}

function migrations (state = {}, action) {
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
  app: appReducer,
  migrations,
  form: formReducer,
  routing: routerReducer,
  user,
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
  loadedNoteId
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
      /*
      state.workbooks = undefined
      state.goals = undefined
      state.notes = undefined
       */
  }

  return appHub(state, action)
}

const persisterReducer = (peristor = {test: 'test'}) => {
    console.log(peristor);
    return rootReducer;
}
export default persisterReducer;
