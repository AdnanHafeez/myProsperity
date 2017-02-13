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
import { syncHistoryWithStore, routerMiddleware, push,replace} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {navigationCreateMiddleware} from 'local-t2-navigation-redux';
import navigationConfig from './navigationConfig';
import createMigration from 'redux-persist-migrate';
import appReducer from './reducers';
import {switchToAppProvider,switchToSecurityProvider,cordovaDeviceReady as deviceReady} from './actions/security';
import * as objectAssign from 'object-assign';
//import createEncryptor from 'redux-persist-transform-encrypt';
import localForage from 'localForage';
import createAsyncEncryptor from 'redux-persist-transform-encrypt/async';
import {userLogout,encryptedDbPaused,loadAppState,turnAppOff} from './actions';


import createPersistorAdapter from './persistStoreAdapter';
import createPromiseTransform from './createPromiseTransform';
import {BrowserCryptoPromise,PromisePeristerTransform} from './lib/CryptoPromise';

const doNotSave = ['mode','user','cordova','onLogout'];
const doNotEncrypt = ['migrations','navigation','routing','view','onLogout','user'];
const cryptoKey = 'asdfasfsdffsf'



const cryptoPromise = new BrowserCryptoPromise();
const promisePeristerTransform = new PromisePeristerTransform(
                                          cryptoPromise,
                                          doNotSave,
                                          doNotEncrypt
                                        );
/**
 * Apply migrations that have yet to be run.
 */

const manifest = {
  '1006': (state) => (objectAssign(state, {workbooks: undefined}))
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



const appStore = createStore(
    appReducer as any, // app reducer // TODO remove "as any"
    undefined,
    compose(
          applyMiddleware(
            thunkMiddleware.withExtraArgument({test: 'yay',cryptoPromise: cryptoPromise}),
            sagaMiddleware,
            routerMiddleware(hashHistory),
            navigationCreateMiddleware(navigationConfig)
          )
        )
  );


//sagaMiddleware.run(appSaga); // saga middleware will not run until this operation  is called

const appHistory = syncHistoryWithStore(hashHistory, appStore);

if(__INCLUDE_SERVICE_WORKER__ && !__IS_CORDOVA_BUILD__){ // __INCLUDE_SERVICE_WORKER__ and other __VAR_NAME__ variables are used by webpack durring the build process. See <root>/webpack-production.config.js
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
    registerPromise(registrationPromise, appStore).then(function (res) {
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
  appStore.subscribe(() => {
    console.log(appStore.getState()); // list entire state of app in js console. Essential for debugging.
  });
}




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

export const onCordovaDeviceReady = () => {


      document.addEventListener("pause", onPause, false);
      document.addEventListener("resume", onResume, false);
      document.addEventListener("menubutton", onMenuKeyDown, false);
     
     if(__IS_CORDOVA_BUILD__){
        
        var error = function(message) { console.log("!! FAILED !! API returned: " + message); };
        var success = function(echoValue) { console.log("--SUCCESS-- API returned: " + echoValue); };
        
        (window as any).t2crypto.setApiTestFlag("0", success, error);

        var init = { TAG: "Initializing T2Crypto" };
        (window as any).t2crypto.initT2Crypto(init, function(args){
          if(args.RESULT === 0) {
            console.log("T2Crypto initialized");
          }
          else {
            console.log("Error during T2Crypto initialization: " + args.RESULT);
          }
        },(err) => {
          console.log('Error on t2crypto init');
          console.log(err);

        }); 
        (window as any).t2crypto.setVerboseLogging({"VERBOSE_LOGGING": "1"}, function(result) {
            if(__DEVTOOLS__){
              console.log("Verbose Logging");
              console.log(result);
            }
        });
        if(__DEVTOOLS__){
            console.log("Dispatching device ready event");
        }
        
        cryptoPromise.setCrypto((window as any).t2crypto);
        
     }

}



function onPause() {
    console.log('cordova pause');
    appStore.dispatch(turnAppOff('/'));
}

function onResume() {

}

function onMenuKeyDown() {
    console.log('cordova onMenuKeyDown');
    // Handle the menubutton event
}
var persistEncryptedConfig =  {
                                      keyPrefix: 't2UnifiedEncryptedPersist',
                                      blacklist: doNotSave,
                                      storage: localForage,
                                      inboundTransform: promisePeristerTransform.transform()
                                    };


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
 rehydrated: any;
}

class AppProvider extends React.Component<MyProps, MyState> {

  constructor (props) {
    super(props);
    this.props = props;
    this.state = { rehydrated: false };
  }

  componentWillMount () { // only called on first load or hard browser refresh

    (getStoredState(persistEncryptedConfig) as any).then((storedState) => {
      
       let hydratePromises = [];

       let isStateEmpty = Object.keys(storedState).length === 0;
       //appStore.dispatch(loadAppState({}));
       const persistor = createPersistorAdapter(appStore, persistEncryptedConfig);
       console.log(storedState);

       //promisePeristerTransform.unLock(cryptoKey);
       persistor.rehydrate(storedState);

       //appStore.dispatch(loadAppState(storedState));
       


       this.setState({rehydrated: true});

    }).catch(function(err){
        console.log(err);
    });
  }

  componentWillUpdate(nextProps){
    console.log("root component will update");
  }

  render () {
    if (!this.state.rehydrated) {
      return <BlankPage><SplashPage/></BlankPage>;
    }
    return (
      <Provider store={appStore}>
        <Router  history={appHistory} routes={rootRoute} />
      </Provider>
    );
  }
}



export default AppProvider
