import NotesContainer from '../NotesContainer.tsx';

export default {
  path: 'notes',

  getComponent (nextState, callback) {
    callback(null, NotesContainer);
  }
};
