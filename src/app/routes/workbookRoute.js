import WorbookContainer from '../WorkbookContainer.tsx';

const workbookPage = {
  path: 'workbook/:id',

  getComponent(nextState, callback) {
    console.log('workbook page called')
    require.ensure([], function (require) {
      callback(null, WorbookContainer)
    });
  }
};


export default workbookPage;