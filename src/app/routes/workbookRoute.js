import WorbookContainer from '../WorkbookContainer.tsx';

export default {
  path: 'workbook/:id',

  getComponent (nextState, callback) {
    callback(null, WorbookContainer);
  }
};
