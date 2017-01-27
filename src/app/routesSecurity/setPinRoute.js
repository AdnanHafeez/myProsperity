import SetQuestions from '../SecuritySetPinContainer.tsx';
export default {
  path: 'setpin',
  getComponent (nextState, cb) {
    cb(null, SetQuestions);
  }
};