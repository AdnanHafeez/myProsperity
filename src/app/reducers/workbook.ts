import {wbData} from '../data/workbook';
import { normalize, schema } from 'normalizr';
import * as objectAssign from 'object-assign';
import {GoalReducerInterface} from '../data/workbook';
import {REHYDRATE} from 'redux-persist/constants'
console.log(wbData);
const example = new schema.Entity('examples');
const goal = new schema.Entity('goals');
const workbook = new schema.Entity('workbooks',{
  examples: [example],
  goals: [goal]
});
import {GOAL_SUBMITTED,GOAL_LOAD,GOAL_EDIT,GOAL_DELETED,USER_LOGIN,USER_LOGOUT} from '../actions';
const workBookListSchema = new schema.Array(workbook);
const normalizedData = normalize(wbData, workBookListSchema);
console.log(normalizedData);

export const goalFactory = (id: number, title: string, desc: string = ''): GoalReducerInterface => {
  return {
    id,
    title,
    desc
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
export const workbooks = (state = normalizedData.entities.workbooks, action) => {
  switch(action.type){
    case GOAL_SUBMITTED:
        if(!checkProperty(state,action.workbookId)){
          return state;
        }
        state[ action.workbookId + ''].goals.push(action.id);
        state = objectAssign({},state);
        break;
    case GOAL_DELETED:
        if(!checkProperty(state,action.workbookId)){
          return state;
        }
        let goalIdx = state[ action.workbookId + ''].goals.indexOf(action.id);
        if(goalIdx > -1){
           state[ action.workbookId + ''].goals.splice(goalIdx,1);
           state = objectAssign({},state);
        }
        break;
  }
  return state;
}

export const workbookIds = (state = normalizedData.result, action) => {
  return state;
}

export const examples = (state = normalizedData.entities.examples,action) => {
  return state;
}

export const goals = (state = normalizedData.entities.goals || {},action) => {
  switch(action.type){
    case REHYDRATE:
       var incoming = action.payload.myReducer
      // TODO if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
       break;
    case USER_LOGIN:
      // TODO
      break;
    case USER_LOGOUT:
      // TODO
      break;
    case GOAL_SUBMITTED:
        state[action.id + ''] = goalFactory(action.id, action.text);
        state = objectAssign({},state);
        break;
     case GOAL_EDIT:
        state[action.goal.id + ''] = action.goal;
        state = objectAssign({},state);
        break;
    case GOAL_DELETED:
      delete state[action.id + ''];
      state = objectAssign({},state);
      break;
  }
  return state;
}

export const loadedGoalId = (state = -1,action) => {
  switch(action.type){
    case GOAL_LOAD:
      state = action.id;
      break;
  }
  return state;
}



