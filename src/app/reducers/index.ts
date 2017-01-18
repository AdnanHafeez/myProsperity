import {combineReducers} from 'redux';
import {view} from './view';
import {videos, videoIds} from './videos';
import assessment from './assessment';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import {REHYDRATE} from 'redux-persist/constants';

import {deviceReducer} from 'local-t2-device-redux';
import {navigationReducer} from 'local-t2-navigation-redux';
import {appReducer} from 'local-t2-app-redux';
import * as objectAssign from 'object-assign';
import {workbooks,workbookIds, examples, goals} from './workbook';
/*
* The data below could come from a rest server
*/
const defaultUser = {
  stage: 0,
  loaded: 0,
  role: 'anonymous',
  firstname: '',
  lastname: ''
};

interface GoalInterface {
  id: string;
  name: string;
  date: string;
}
interface GoalTreeInterface {
  [propName: string]: GoalInterface;
}

let goalIds: string[] = ['1','2'];
let defaultGoals: GoalTreeInterface = {
  '1': {
    id: '1',
    name: 'Test Goal #1',
    date: 'asdaf'
  },
  '2': {
    id: '2',
    name: 'Test Goal #2',
    date: 'asdaf'
  }
};

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
      if (state.loaded === 0) {
        if (typeof action.payload.user !== 'undefined') {
          return objectAssign({},action.payload.user);
        }
        return objectAssign({},state,{loaded: 1});
      }
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
  return getMax(array) + 1;
}

const appHub = combineReducers({
  app: appReducer,
  migrations,
  videos,
  videoIds,
  assessment,
  form: formReducer,
  routing: routerReducer,
  user,
  view,
  device: deviceReducer,
  navigation: navigationReducer,
  workbooks,
  workbookIds,
  examples,
  goals
});

export default appHub;
