export default {
  '1': {
    id: '1',
    name: 'Message From The Director',
    routes: ['/main/intro', '/', '/intro'],
    pathname: '/main/intro',
    level: 0,
    childrenIds: ['3'],
    parentId: null,
    display: true
  },
  '3': {
    id: '3',
    name: 'S.M.A.R.T. Goals',
    routes: ['/main/home'],
    level: 1,
    pathname: '/main/home',
    childrenIds: ['4','5','6'],
    display: true
  },
  '4': {
    id: '4',
    name: 'Message From The Director',
    routes: ['/main/message'],
    pathname: '/main/message',
    level: 2,
    childrenIds: [],
    display: true
  },
  '5': {
    id: '5',
    name: 'Workbook',
    routes: [new RegExp('/main/workbook/[0-9]+')],
    level: 2,
    pathname: '/main/workbook',
    childrenIds: [],
    display: false
  },
  '6': {
    id: '6',
    name: 'Notes',
    routes: ['/main/notes'],
    level: 2,
    pathname: '/main/notes',
    childrenIds: [],
    display: false
  }
};
