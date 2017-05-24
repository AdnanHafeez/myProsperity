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
import {persistStore, autoRehydrate, createTransform, createPersistor, getStoredState} from 'redux-persist';
import {registerPromise} from 'local-t2-app-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';
import createMigration from 'redux-persist-migrate';
import securityReducer from './reducerSecurity';
import * as objectAssign from 'object-assign';
import createEncryptor from 'redux-persist-transform-encrypt';
import {userLogout,encryptedDbPaused} from './actions';
import * as localForage from 'localforage';


const sagaMiddleware = createSagaMiddleware();
//{createMigration}
/**
 * Apply migrations that have yet to be run.
 */



const manifest = {
  '1006': (state) => (state)
};
const reducerKey = 'sMigrations';
const migration = createMigration(manifest, reducerKey);

export const securityRoutes = [
  {
    getComponent (nextState, cb) {
      cb(null, BlankPage);
    },
    name: 'securityRoot',
    childRoutes: [
      require('./routesSecurity/quickLoadRoutes.js').default,
      require('./routesSecurity/mainRoutes.js').default,
      require('./routesSecurity/notFoundRoute.js').default
    ]
  }
];

export const securityStore = createStore(
    securityReducer as any, // app reducer // TODO remove "as any"
    undefined,
    compose(
          applyMiddleware(
            thunkMiddleware,
            sagaMiddleware,
            routerMiddleware(hashHistory),
            navigationCreateMiddleware(navigationConfig)
          ),
          migration,
          autoRehydrate()
        )
  );

if (__DEVTOOLS__) { // Webpack defined variable for build process
  securityStore.subscribe(() => {
    console.log(securityStore.getState()); // list entire state of app in js console. Essential for debugging.
  });
}


