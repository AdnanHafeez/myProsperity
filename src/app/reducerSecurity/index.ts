import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import {REHYDRATE} from 'redux-persist/constants';


import * as objectAssign from 'object-assign';
import {USER_LOGIN, USER_LOGOUT, ENCRYPTED_DB_PAUSED} from '../actions'
/*
* The data below could come from a rest server
*/

export interface PinQuestionInteface  {
  id: string;
  title: string;
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
  secondQuestionAnwser: '' // etc, etc //TODO implement pin lock system
};

const pinQuestionsDefault: PinQuestionInteface[] = [
  { id:"QUESTION_OPT_1", title:"What was the name of your kindergarten teacher?"},
  { id:"QUESTION_OPT_2", title:"What is your first pet's name?"},
  { id:"QUESTION_OPT_3", title:"What is the name of the city you were born in?"},
  { id:"QUESTION_OPT_4", title:"In what city or town did you meet your spouse/partner?"},
  { id:"QUESTION_OPT_5", title:"What was the make and model of your first car?"},
  { id:"QUESTION_OPT_6", title:"What high school did you attend?"},
  { id:"QUESTION_OPT_7", title:"What is your favorite movie?"},
  { id:"QUESTION_OPT_8", title:"What is your favorite sports team?"},
  { id:"QUESTION_OPT_9", title:"What branch of the military did you serve?"},
  { id:"QUESTION_OPT_10", title:"What was your favorite high school activity?"},
  { id:"QUESTION_OPT_NONE", title:"None Selected"}
]


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

  }
  return state;
}

function migrations (state = {}, action) {
  return state;
}

function pinQuestions(state = pinQuestionsDefault, action){

}

function pinQuestionIds(state = Object.keys(pinQuestionsDefault).map((id) => id), action){
  return state;
}

function selectedPinQuestionIds(state =[], action){
  return state;
}

const securityReducer = combineReducers({
  sMigrations: migrations,
  sUser: user
});

const rootReducer = (state, action) => {
  
  if (action.type === ENCRYPTED_DB_PAUSED) {

  }

  return securityReducer(state, action)
}

export default rootReducer;
