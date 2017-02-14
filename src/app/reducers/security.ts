import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {REHYDRATE} from 'redux-persist/constants';
import * as objectAssign from 'object-assign';
import {
  EDIT_ALL_QUESTIONS, 
  LOCK_APPLICATION, 
  UNLOCK_APPLICATION,
  CORDOVA_DEVICE_READY,
  EULA_ACCEPTED,
  EULA_REJECTED,
  FIPS_IS_SETUP
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
  eulaAccepted: false,
  fipsIsSetUp: false
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



export const user = (state = defaultUser, action) => {
  switch (action.type) {
    case EULA_ACCEPTED:
      state = {...state,eulaAccepted: true}
      break;
    case EULA_REJECTED:
      state = {...state,eulaAccepted: false}
      break;
    case UNLOCK_APPLICATION:
      state = {...state,fipsIsSetUp: true}
      break;
  }
  return state;
}


export const pinQuestions = (state = pinQuestionsDefault, action) => {
  return state;
}

export const pinQuestionIds = (state = Object.keys(pinQuestionsDefault).map((key) => key), action) => {
  return state;
}



export const rikey = (state = '', action) => {
  switch(action.type){
    case UNLOCK_APPLICATION:
      state = action.rikey;
      break;
    case LOCK_APPLICATION:
      state = '';
      break;
  }
  return state;
}


export const selectedPinQuestionIds = (state =['QUESTION_OPT_NONE','QUESTION_OPT_NONE'], action) => {
  switch(action.type){
    case EDIT_ALL_QUESTIONS:
      state[0] = action.question1Id;
      state[1] = action.question2Id;
      state = state.map(item => item);
      break;
  }
  return state;
}


const defaultState = {
  '1': {questionId: null},
  '2': {questionId: null}
}

export const questionAnswers = (state = {}, action) => {
  switch(action.type){
    case EDIT_ALL_QUESTIONS:
      state['1'] = {...{},questionId: action.question1Id},
      state['2'] = {...{},questionId: action.question2Id}
      state = {...state};
      break;
  }
  return state;
}



const cordovaDefaults = {
  deviceReady: false
}

export const cordova = (state = cordovaDefaults, action) => {
  switch(action.type){
    case CORDOVA_DEVICE_READY:
      state = {...state,deviceReady: true};
      break;
  }
  return state;
}

export default {
  user,
  pinQuestions,
  pinQuestionIds,
  rikey,
  selectedPinQuestionIds,
  questionAnswers,
  cordova
}


