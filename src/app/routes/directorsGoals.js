import DGoals from '../DirectorsGoals.tsx';

export default {
  path: 'goals',
  getComponent (nextState, cb) {
    cb(null, DGoals);
  }
};
