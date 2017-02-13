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
import {
  GOAL_SUBMITTED,
  GOAL_LOAD,
  GOAL_EDIT,
  GOAL_DELETED,
  GOAL_STATUS_CHANGE
} from '../actions';
const workBookListSchema = new schema.Array(workbook);
const normalizedData = normalize(wbData, workBookListSchema);
console.log(normalizedData);

export const goalFactory = (id: number, title: string, status = 0, dueDate = -1): GoalReducerInterface => {
  return {
    id,
    title,
    desc: '',
    status,
    dueDate
  }
}

function checkProperty(ob,prop){
        if(typeof ob[ prop + ''] === 'undefined'){
          if(__DEVTOOLS__){
            console.log("Invalid object id submitted to reducer");
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
       // noop
       break;
    case GOAL_STATUS_CHANGE:
        console.log(GOAL_STATUS_CHANGE);
        if(checkProperty(state,action.id)){
          console.log(action.status);
          state[action.id + ''] = {...state[action.id + ''],status: action.status};
          state = objectAssign({},state);
        }
        break;
    case GOAL_SUBMITTED:
        state[action.id + ''] = goalFactory(action.id, action.goal.title,action.goal.status,action.goal.dueDate);
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



