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
import {persistStore, autoRehydrate, createTransform, createPersistor, getStoredState, purgeStoredState} from 'redux-persist';
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
import * as localForage from 'localforage';
import createAsyncEncryptor from 'redux-persist-transform-encrypt/async';
import {userLogout,encryptedDbPaused,loadAppState,turnAppOff} from './actions';

import {securityStore,securityRoutes} from './SecurityProvider';
import createPersistorAdapter from './persistStoreAdapter';
import createPromiseTransform from './createPromiseTransform';
var asyncTransform = createAsyncEncryptor({secretKey: 'adadaei8f9s'});
/**
 * Apply migrations that have yet to be run.
 */
const allEncFields = ['app',
  'migrations',
  'routing',
  'user',
  'view',
  'device',
  'navigation',
  'workbooks',
  'workbookIds',
  'examples',
  'goals',
  'loadedGoalId',
  'notes',
  'noteIds',
  'loadedNoteId',
  'mode',
  'onLogout','bacon_beef']; //TODO remove bacon_beef

const allDecFields = [
  'sMigrations',
  'sUser',
  'pinQuestionIds',
  'pinQuestions',
  'selectedPinQuestionIds',
  'questionAnswers',
  'mode',
  'routing',
  'cordova',
  'rikey',
  'view'
];


//manifest not currently in use
const manifest = {
  '1006': (state) => (objectAssign(state, {workbooks: undefined}))
};

/**
 * Saga is an alternative to "thunks". It is used to handle asychronous
 * tasks.
 * @see https://github.com/yelouafi/redux-saga
 * For this app it was used to check internet connectivity status every X seconds
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Migrations setup.
 *
 * @see  https://github.com/wildlifela/redux-persist-migrate
 */
let reducerKey = 'migrations'; // name of the migration
//manifest not currently in use
const migration = createMigration(manifest, reducerKey);
// const persistEnhancer = compose(migration, autoRehydrate());

/**
 * [description]
 * @return {[type]} [description]
 */
const getRiPin = () => {
   const fullKey =  (securityStore as any).getState().rikey
   return fullKey.substring(0,30);
}

if(__IS_CORDOVA_BUILD__){
var transformEncryptTransform = createPromiseTransform(
    // transform state coming from redux on its way to being serialized and stored

    (inboundState, key) => {
     console.log(inboundState);
      if(__DEVTOOLS__){
        console.log(inboundState);
        console.log(getRiPin());
      }
      return new Promise(function(res,rej){
          let dataJSON = {
                      "KEY_PIN": getRiPin(),
                      "KEY_INPUT": JSON.stringify(inboundState)
                    };
          (window as any).t2crypto.encryptRaw(dataJSON,function success(result){
              if(result.RESULT !== -1){
                if(__DEVTOOLS__){
                  console.log('inbound enc '+ result.RESULT);
                  console.log(result.RESULT)
                }

                res(result.RESULT);
              }else{
                let err = {
                  message: 'inbound encryption failer',
                  key: key
                }
                if(__DEVTOOLS__){
                  console.log(err);
                }
                rej(err);
              }
          });
      }).then(function(rs){
         return rs;
      });
    },
    // transform state coming from storage, on its way to be rehydrated into redux
    (outboundState, key) =>  {
      return outboundState;
    }
  );
} else {
var transformEncryptTransform = createPromiseTransform(
    // transform state coming from redux on its way to being serialized and stored
    (inboundState, key) => {

      return new Promise(function(res,rej){
            res(inboundState);
      }).then(function(rs){
         return rs;
      }).catch(function(e){
        console.log(e);
      });
      
    },
    // transform state coming from storage, on its way to be rehydrated into redux
    (outboundState, key) =>  {
      
      return new Promise(function(res,rej){
            res(outboundState);
      }).then(function(rs){
         return rs;
      }).catch(function(e){
        console.log(e);
      });
    }
  );
}
///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var tmpIsOldDb = false;
// State of app is persisted and made availabe via the call below



const appStore = createStore(
    appReducer as any, // app reducer // TODO remove "as any"
    undefined,
    compose(
          applyMiddleware(
            thunkMiddleware,
            sagaMiddleware,
            routerMiddleware(hashHistory),
            navigationCreateMiddleware(navigationConfig)
          )/*,
          migration,
          autoRehydrate() */
        )
  );


//sagaMiddleware.run(appSaga); // saga middleware will not run until this operation  is called

const appHistory = syncHistoryWithStore(hashHistory, appStore);
const securityHistory = syncHistoryWithStore(hashHistory, securityStore);
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
if(!__IS_CORDOVA_BUILD__){
  securityStore.dispatch(deviceReady());
}

export const onCordovaDeviceReady = () => {

      console.log((window as any).t2crypto);
      console.log('cordova device ready');
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
        
      
        securityStore.dispatch(deviceReady());
     }

}


let _pauseTimeout = null;
function onPause() {
  
    const timeout = 1000 * 60 * 1;
    if(_pauseTimeout){
      window.clearTimeout(_pauseTimeout);
    }
    _pauseTimeout = window.setTimeout(() =>{
        appStore.dispatch(turnAppOff('/'));
    },timeout);
    
}

function onResume() {
    if(_pauseTimeout){
      window.clearTimeout(_pauseTimeout);
    }
   // console.log('cordova resume');
   // securityStore.dispatch(push('/'));
}

function onMenuKeyDown() {
    console.log('cordova onMenuKeyDown');
    // Handle the menubutton event
}
var persistEncryptedConfig =  {
                                      keyPrefix: 't2encryptedPersistlf',
                                      blacklist: ['mode','cordova','view','onLogout'],
                                      storage: localForage,
                                      inboundTransform: transformEncryptTransform
                                    };
//Below is storage config for release 1.0.22 
//If user is updating from this version we need to migrate data from the old location
//to the new location established by  var persistEncryptedConfig;
//                                                                   
var persistEncryptedConfig_old = { //the storage config for release 1.0.22 if exist
                                      keyPrefix: 't2encryptedPersist',
                                      blacklist: ['mode','cordova','view','onLogout'],
                                      storage: null,
                                      inboundTransform: transformEncryptTransform
                                    };

//////////////////////////////////////////////////////////////////////

var appStorePersistor = createPersistorAdapter(appStore, persistEncryptedConfig);


appStorePersistor.pause();
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
 locked: any;
}

class AppProvider extends React.Component<MyProps, MyState> {

  constructor (props) {
    super(props);
    this.props = props;
    this.state = { rehydrated: false, locked: true };
  }

  componentWillMount () { // only called on first load or hard browser refresh
    /**
     * keyPrefix: This prefix is added to all root properties of the app state
     * This is important if you are hosting multiple apps on the same origin.
     * Otherwise databases from other apps will overlap and cause strange behavior
     */
 

    console.log((window as any).t2crypto);


    const persistDecryptedConfig = {
        keyPrefix: 'decryptedpersistorlf',
        storage: localForage,
        blacklist: ['mode','cordova','rikey','view'],
    };

//Below is storage config for release 1.0.22 
//If user is updating from this version we need to migrate data from the old storage location
//to the new location established by  var persistDecryptedConfig;

    const persistDecryptedConfig_old = {
        keyPrefix: 'decryptedpersistor',
        storage: null,
        blacklist: ['mode','cordova','rikey','view'],
    };


//////////////////////////////////////////////////////////

    const securityPersist = persistStore(
                        securityStore, 
                        persistDecryptedConfig, 
                        () => {
                           this.setState({ rehydrated: true } as any);
                        }
                  );
       
    getStoredState(persistDecryptedConfig_old, (err, state) => {
       if(!err && state && typeof state['sUser'] !== 'undefined'){ //we have data from old db
          securityPersist.rehydrate(state,{serial: false}); //move data to new persistor
          purgeStoredState({storage: localStorage as any, keyPrefix: 'decryptedpersistor'},allDecFields); //delete old data
       }
    }); 
  


      var appIsActive = false;
      
      securityStore.subscribe(() => {
   

          if((securityStore as any).getState().mode === 0 && !appIsActive){
            if(__DEVTOOLS__){
              console.log('----------LOADING APP STORE---------');
            }
            //(persistDecryptedConfig)
              //we want to retrieve the old db when new db is active
              (getStoredState(persistEncryptedConfig_old) as any).then((storedEncryptedState_old) => {

                  if(storedEncryptedState_old && typeof storedEncryptedState_old['notes'] !== 'undefined'){ //see if we have data to migrate
                    //this is were we 
                    //delete the old data base
                      purgeStoredState({storage: (window.localStorage as any),keyPrefix: 't2encryptedPersist'},allEncFields);
                      return storedEncryptedState_old;
                  }
  
                  return (getStoredState(persistEncryptedConfig) as any)
              }).then((storedState) => {
                appIsActive = true;
               let hydratePromises = [];

               let isStateEmpty = Object.keys(storedState).length === 0;

               Object.keys(storedState).forEach((objectKey) => {
               
                  let field = new Promise((resolve,reject) => {
                        if(__DEVTOOLS__){
                          console.log('outgoing data rikey');
                          console.log(getRiPin());
                        }
                      if(__IS_CORDOVA_BUILD__){
                        let dataJSON = {
                          "KEY_PIN": getRiPin(),
                          "KEY_INPUT": storedState[objectKey]
                        };
                        if(__DEVTOOLS__){
                          console.log('calling decryptRaw for objectKey');
                          console.log(dataJSON);
                        }
                        (window as any).t2crypto.decryptRaw(dataJSON,(result) => {
                            if(result.RESULT !== -1){
                                if(__DEVTOOLS__){
                                  console.log('decrypting');
                                  console.log(result.RESULT);
                                }

                                let parsedResult;
                                try {
                                    parsedResult = JSON.parse(result.RESULT);
                                } catch(e) {
                                    if(__DEVTOOLS__){
                                      console.log('could not parse the following');
                                      console.log(result.RESULT);
                                      console.log('Field ' + objectKey);
                                    }
                                    parsedResult = null;
                                    //TODO decide what to do here
                                }
                                
                                resolve([objectKey,parsedResult]);
                            } else {
                              let err = {
                                message: 'cordova: failed decryption on field ' + objectKey
                              }
                              console.log(err);
                              reject(err);
                            }
                        },(er) => {
                          console.log("Error cb is implemented");
                          console.log(er);
                        });
                      }else{
                        resolve([objectKey,storedState[objectKey]]);
                      }
                  });
                  hydratePromises.push(field);
                });
                if(isStateEmpty){
                      if(__DEVTOOLS__){
                        console.log("stored state is empty");
                      }
                      
                      appStore.dispatch(loadAppState(storedState));
                      appStorePersistor.resume();
                      this.setState({ locked: false } as any);
                } else {
                 if(__DEVTOOLS__){
                   console.log("stored state has data");
                 }
                 Promise.all(hydratePromises).then((results) => {
                      let finalStoredState = results.reduce(function(accum,result){
                            let [key,value] = result;
                            accum[key] = value
                            return accum;
                      },{});
                      if(__DEVTOOLS__){
                        console.log('promise array complete');
                        console.log(finalStoredState);
                      }
                      appStore.dispatch(loadAppState(finalStoredState));
                      appStorePersistor.resume();
                      this.setState({ locked: false } as any);
                  }).catch(function(err){
                    console.log(err); //TODO handle problems
                  });
                }

            }).catch(function(err){
                console.log(err);
            });
 
          }
      });

      appStore.subscribe(() => {
          if ((appStore as any).getState().mode === 0 && appIsActive) {
            if(__DEVTOOLS__){
              console.log('----------LOADING SECURITY STORE---------');
            }

            const logoutRedirect =  (appStore as any).getState().onLogout.redirect || '/';
            
            appStorePersistor.pause();
            
            console.log(logoutRedirect);
            this.setState({ locked: true } as any);

            appIsActive = false;
            securityStore.dispatch(switchToSecurityProvider()); // securityState.mode == 1
            securityStore.dispatch(push(logoutRedirect));
          }
      });
   
  }

  componentWillUpdate(nextProps){
    console.log("root component will update");
  }

  render () {
    if (!this.state.rehydrated) {
      return <BlankPage><SplashPage/></BlankPage>;
    }
    if(this.state.locked){
      return (
        <Provider key='dec_store' store={securityStore}>
          <Router history={securityHistory} routes={securityRoutes} />
        </Provider>
      );
    }
    return (
      <Provider key='enc_store' store={appStore}>
        <Router  history={appHistory} routes={rootRoute} />
      </Provider>
    );
  }
}



export default AppProvider
