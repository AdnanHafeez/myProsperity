import SetQuestionContainer from '../SecuritySetQuestionsContainer.tsx';

export default {
  path: 'changequestions',
  getComponent (nextState, cb) {
    cb(null, SetQuestionContainer);
  }
};
