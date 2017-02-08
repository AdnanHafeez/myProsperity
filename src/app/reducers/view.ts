import {
	SHOW_FLASH_MESSAGE,
	HIDE_FLASH_MESSAGE,
	ERROR_MESSAGE
} from '../actions'

import {deviceReducer, deviceActions} from 'local-t2-device-redux';
const {	TAB_CHANGE_INDEX,
	ORIENTATION_CHANGE,
	WINDOW_RESIZE} = deviceActions;
import * as objectAssign from 'object-assign';
/*
* This is default view data which germane to the app ui only 
* and should be kept separate from rest of the state.
*/
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
      let newFlash = {...state.flash,message: action.message,open: true, type: 'error'};
      state.flash = newFlash;
      state = {...state}; 
      break; 
		case SHOW_FLASH_MESSAGE: //Display an action message
			state.flash.message = action.text;
			state.flash.open = true;
			return objectAssign({}, state); 
		case HIDE_FLASH_MESSAGE:
			state.flash.message = '';
			state.flash.open = false;
			return objectAssign({}, state);
  }
  return state;
}