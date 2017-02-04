import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {REHYDRATE} from 'redux-persist/constants';

import * as objectAssign from 'object-assign';
import {
  EDIT_QUESTION_1,
  EDIT_QUESTION_2,
  EDIT_PIN_FORM, 
  SWITCH_TO_APP_PROVIDER, 
  SWITCH_TO_SECURITY_PROVIDER,
  CORDOVA_DEVICE_READY,
  EULA_ACCEPTED,
  EULA_REJECTED,
  FIPS_IS_SETUP,
  CORDOVA_LOGIN_RIKEY,
  ERROR_MESSAGE
} from '../actions/security'
/*
* The data below could come from a rest server
*/

export interface PinQuestionInteface  {
  id: string;
  title: string;
}


export interface QuestionAnswers {
  questionId: string;
  answer: string;
}


const defaultUser = {
  stage: 0,
  loaded: 0,
  role: 'anonymous',
  firstname: '',
  lastname: '',
  isAuthenticated: false,
  pin: '',
  firstQuestionAnwser: '',
  secondQuestionAnwser: '',
  eulaAccepted: false,
  fipsIsSetUp: false,
};

interface PinQuestionsMap {
  [key: string]: {id: string, title: string}
}

const pinQuestionsDefault: PinQuestionsMap = {
  'QUESTION_OPT_1': { id:"QUESTION_OPT_1", title:"What was the name of your kindergarten teacher?"},
  'QUESTION_OPT_2': { id:"QUESTION_OPT_2", title:"What is your first pet's name?"},
  'QUESTION_OPT_3': { id:"QUESTION_OPT_3", title:"What is the name of the city you were born in?"},
  'QUESTION_OPT_4': { id:"QUESTION_OPT_4", title:"In what city or town did you meet your spouse/partner?"},
  'QUESTION_OPT_5': { id:"QUESTION_OPT_5", title:"What was the make and model of your first car?"},
  'QUESTION_OPT_6': { id:"QUESTION_OPT_6", title:"What high school did you attend?"},
  'QUESTION_OPT_7': { id:"QUESTION_OPT_7", title:"What is your favorite movie?"},
  'QUESTION_OPT_8': { id:"QUESTION_OPT_8", title:"What is your favorite sports team?"},
  'QUESTION_OPT_9': { id:"QUESTION_OPT_9", title:"What branch of the military did you serve?"},
  'QUESTION_OPT_10': { id:"QUESTION_OPT_10", title:"What was your favorite high school activity?"},
  
}

const questionNone = {'QUESTION_OPT_NONE': { id:"QUESTION_OPT_NONE", title:"None Selected"}};




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
    case EULA_ACCEPTED:
      state = {...state,eulaAccepted: true}
      break;
    case EULA_REJECTED:
      state = {...state,eulaAccepted: false}
      break;
    case CORDOVA_LOGIN_RIKEY:
      state = {...state,fipsIsSetUp: true}
      break;
  }
  return state;
}

function migrations (state = {}, action) {
  return state;
}

function pinQuestions(state = pinQuestionsDefault, action){
  return state;
}

function pinQuestionIds(state = Object.keys(pinQuestionsDefault).map((key) => key), action){
  return state;
}

function mode(state = 1, action){
  switch(action.type){
    case CORDOVA_LOGIN_RIKEY:
      state = 0;
      break;
    case SWITCH_TO_SECURITY_PROVIDER:
      state = 1;
      break;
  }
  return state;
}

function rikey(state = '', action) {
  switch(action.type){
    case CORDOVA_LOGIN_RIKEY:
      state = action.rikey;
      break;
    case SWITCH_TO_SECURITY_PROVIDER:
      state = '';
      break;
  }
  return state;
}


function selectedPinQuestionIds(state =['QUESTION_OPT_NONE','QUESTION_OPT_NONE'], action){
  switch(action.type){
    case EDIT_PIN_FORM:
      state[0] = action.question1Id;
      state[1] = action.question2Id;
      state = state.map(item => item);
      break;
    case EDIT_QUESTION_1:
      state[0] = action.questionId;
      state = state.map(item => item);
      break;
    case EDIT_QUESTION_2:
      state = state.map(item => item);
      state[1] = action.questionId;
      break;
  }
  return state;
}


const defaultState = {
  '1': {questionId: null, answer: ''},
  '2': {questionId: null, answer: ''}
}

function questionAnswers(state = {}, action){
  switch(action.type){
    case EDIT_PIN_FORM:
      state['1'] = objectAssign({},{questionId: action.question1Id, answer: action.answer1 })
      state['2'] = objectAssign({},{questionId: action.question2Id, answer: action.answer2 })
      state = objectAssign({},state);
      break;
    case EDIT_QUESTION_1:
      state['1'] = objectAssign({},{questionId: action.questioId, answer: action.answer });
      state = objectAssign({},state);
      break;
    case EDIT_QUESTION_2:
      state['2'] = objectAssign({},{questionId: action.questioId, answer: action.answer });
      state = objectAssign({},state);
      break;
  }
  return state;
}

const defaultView = {
  flash: {
    message: '',
    open: false,
    type: 'notice'
  }
};

export const view = function (state = defaultView, action){
  switch(action.type){
    case ERROR_MESSAGE: //Display an action message
      if(__DEVTOOLS__){
        console.log(action);
      }
      state.flash.message = action.message;
      state.flash.open = true;
      state.flash.type = 'error';
      state = objectAssign({}, state); 
      break; 
  }
  return state;
}


const cordovaDefaults = {
  deviceReady: false
}

const cordova = (state = cordovaDefaults, action) => {
  switch(action.type){
    case CORDOVA_DEVICE_READY:
      console.log(CORDOVA_DEVICE_READY);
      state.deviceReady = true;
      state = objectAssign({},state);
      break;

  }
  return state;
}

const securityReducer = combineReducers({
  sMigrations: migrations,
  sUser: user,
  pinQuestionIds,
  pinQuestions,
  selectedPinQuestionIds,
  questionAnswers,
  mode,
  routing: routerReducer,
  cordova,
  rikey,
  view
});

const rootReducer = (state, action) => {
  return securityReducer(state, action)
}

export default rootReducer;
