import {wbData} from '../data/workbook';
import { normalize, schema } from 'normalizr';
import * as objectAssign from 'object-assign';
import {GoalReducerInterface} from '../data/workbook';

console.log(wbData);
const example = new schema.Entity('examples');
const goal = new schema.Entity('goals');
const workbook = new schema.Entity('workbooks',{
  examples: [example],
  goals: [goal]
});
import {GOAL_SUBMITTED,GOAL_LOAD,GOAL_EDIT} from '../actions';
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

export const workbooks = (state = normalizedData.entities.workbooks, action) => {
  switch(action.type){
    case GOAL_SUBMITTED:
        if(typeof state[ action.workbookId + ''] === 'undefined'){
          if(__DEVTOOLS__){
            console.log("Invalid workbook id submitted to reducer");
          }
          return state;
        }
        state[ action.workbookId + ''].goals.push(action.id);
        state = objectAssign({},state);
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

export const goals = (state = normalizedData.entities.goals,action) => {
  switch(action.type){
    case GOAL_SUBMITTED:
        state[action.id + ''] = goalFactory(action.id, action.text);
        state = objectAssign({},state);
        break;
     case GOAL_EDIT:
        state[action.goal.id + ''] = action.goal;
        state = objectAssign({},state);
        break;
  }
  return state;
}

export const loadedGoalId = (state = 0,action) => {
  switch(action.type){
    case GOAL_LOAD:
      state = action.id;
      break;
  }
  return state;
}



