/**
 * This file is called by ./app.js and is responsible for nearly
 * all of the applications configuration/bootstrapping.
 * The application state and routing originate from here.
 *
 * TODO This file's name should be changed as "PlainRoutes.js" does more
 * than setup routes.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BlankPage from './BlankPage';
import SplashPage from './SplashPage';
import {Router, hashHistory, browserHistory} from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {registerPromise} from 'local-t2-app-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';
import createMigration from 'redux-persist-migrate';
import appHub from './reducers';
import * as objectAssign from 'object-assign';
//console.log(reduxPersMigrate);
//{createMigration}
/**
 * Apply migrations that have yet to be run.
 */

const manifest = {
  '1003': (state) => (objectAssign(state, {workbooks: undefined}))
};

/**
 * Saga is an alternative to "thunks". It is used to handle asychronous
 * tasks.
 * @see https://github.com/yelouafi/redux-saga
 * For this app it is used to check internet connectivity status every X seconds
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Migrations setup.
 *
 * @see  https://github.com/wildlifela/redux-persist-migrate
 */
let reducerKey = 'migrations'; // name of the migration

const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());

// State of app is persisted and made availabe via the call below
const store = createStore(
    appHub as any, // app reducer // TODO remove "as any"
    applyMiddleware(
            routerMiddleware(browserHistory),
            thunkMiddleware,
            sagaMiddleware,
            navigationCreateMiddleware(navigationConfig)
          ),
    persistEnhancer as any// TODO remove "as any"
  );

//sagaMiddleware.run(appSaga); // saga middleware will not run until this operation  is called

const history = syncHistoryWithStore(hashHistory, store);

if(__INCLUDE_SERVICE_WORKER__){ // __INCLUDE_SERVICE_WORKER__ and other __VAR_NAME__ variables are used by webpack durring the build process. See <root>/webpack-production.config.js
  if ('serviceWorker' in navigator) {
    /**
     * Service workers are not supported currently in an iOS browsers
     */
    const registrationPromise = navigator.serviceWorker.register('./ad-service-worker.js');
    /**
     * registerPromise takes the serviceWorker promise and listens for
     * certain events which will trigger redux dispatch events
     *
     * @see https://github.com/jlightfoot2/local-t2-app-redux/blob/master/src/lib/serviceWorker.js
     */
    registerPromise(registrationPromise, store).then(function (res) {
      if (__DEVTOOLS__) {
        console.log(res);
      }
    }).catch(function (e) {
      if (__DEVTOOLS__) {
        console.log(e);
      }
      throw e;
    });
  }
}

if (__DEVTOOLS__) { // Webpack defined variable for build process
  store.subscribe(() => {
    console.log(store.getState()); // list entire state of app in js console. Essential for debugging.
  });
}
document.addEventListener('deviceready', function(){

  store.dispatch({type: 'CORDOVA_DEVICE_READY'});
}, false);
/**
 * This is the root route.
 * Like any route is used to bind Components to a route.
 * All other routes are located in the ./routes directory
 *
 * There is a more intuitive JSX way of defining routes but using
 * "PlainRoutes" allows for async inclusion of routes and their dependencies 
 * @see  http://knowbody.github.io/react-router-docs/api/PlainRoute.html
 */
const rootRoute = [
  {
    getComponent (nextState, cb) {
      cb(null, BlankPage);
    },
    name: 'root',
    childRoutes: [
      require('./routes/quickLoadRoute.js').default,
      require('./routes/mainPageRoute.js').default,
      require('./routes/notFoundRoute.js').default
    ]
  }
];

/**
 * AppProvider is the base/root component for the app
 *
 * This particular component passes the store (redux state) and routes
 * to the application.
 */

interface MyProps {
  [propName: string]: any;
}

interface MyState {
 [propName: string]: any;
 rehydrated: any;
}

export default class AppProvider extends React.Component<MyProps, MyState> {

  constructor (props) {
    super(props);
    this.props = props;
    this.state = { rehydrated: false };
  }

  componentWillMount () { // only called on first load or hard browser refresh
    /**
     * keyPrefix: This prefix is added to all root properties of the app state
     * This is important if you are hosting multiple apps on the same origin.
     * Otherwise databases from other apps will overlap and cause strange behavior
     */
    persistStore(store, {
                          keyPrefix: 'reduxPersistProsperityWorkbook',
                          blacklist: []
                        }, () => {
      /**
       * We wait until the state is hydrated before rendering the ui
       */
      setTimeout(() => {
        this.setState({ rehydrated: true });
      }, 300); // 300 ms is just for effect so using can see "loading" graphic
    });
  }

  render () {
    if (!this.state.rehydrated) {
      return <BlankPage><SplashPage/></BlankPage>;
    }
    return (
      <Provider store={store}>
        <Router history={history} routes={rootRoute} />
      </Provider>
    );
  }
}
