import {wbData} from '../data/workbook';
import { normalize, schema } from 'normalizr';
console.log(wbData);
const example = new schema.Entity('examples');
const goal = new schema.Entity('goals');
const workbook = new schema.Entity('workbooks',{
  examples: [example],
  goals: [goal]
});
const workBookListSchema = new schema.Array(workbook);
const normalizedData = normalize(wbData, workBookListSchema);
console.log(normalizedData);

export const workbooks = (state = normalizedData.entities.workbooks,action) => {
  return state;
}

export const workbookIds = (state = normalizedData.result, action) => {
  return state;
}

export const examples = (state = normalizedData.entities.examples,action) => {
  return state;
}

export const goals = (state = normalizedData.entities.goals,action) => {
  return state;
}