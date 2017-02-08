
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import securityReducer from './reducerSecurity';
import createSagaMiddleware from 'redux-saga';
import {
  SetPinFormInterface,
  ChangePinWithPinFormInterface,
  ChangePinWithQuestionsFormInterface,
  SecurityAnswer3,
  cordovaInitLogin,
  changePinWithPin,
  switchToSecurityProvider,
  cordovaLoginWithPin,
  changePinWithAnswers,
  changeSecurityQuestions,
  ChangeQuestionsWithPinInterface
} from './actions/security';
import * as assert from 'assert';

const sagaMiddleware = createSagaMiddleware();

const securityStoreTest = createStore(
    securityReducer as any, // app reducer // TODO remove "as any"
    undefined,
    compose(
          applyMiddleware(
            thunkMiddleware,
            sagaMiddleware
          )
        )
  );

const validLoginInit1: SetPinFormInterface = {
  question1: 'QUESTION_OPT_1',
  question2: 'QUESTION_OPT_2',
  answer1: 'cheeseburger',
  answer2: 'fuzzybunny',
  pin: '1234',
  pinConfirm: '1234'
}

const validPinChange1:ChangePinWithPinFormInterface = {
  currentPin: validLoginInit1.pin,
  newPin: '9876',
  confirmNewPin: '9876'
}

const invalidPinChange1:ChangePinWithPinFormInterface = {
  currentPin: validLoginInit1.pin + 'asdf',
  newPin: '9876',
  confirmNewPin: '9876'
}

const validPinChangeWithAnswers: ChangePinWithQuestionsFormInterface = {
  answer1: validLoginInit1.answer1,
  answer2: validLoginInit1.answer2,
  newPin: '1892'
};

const validChangeQuestionsWithPin: ChangeQuestionsWithPinInterface = {
  currentPin: validPinChangeWithAnswers.newPin,
  answer1: 'hotdog',
  answer2: 'fluffykitty',
  question1: '',
  question2: ''
}

const ensureCordovaAndPlugins = () => {
  return new Promise((resolve,reject) => {
    assert(__IS_CORDOVA_BUILD__,'These test are mean to be run in cordova build only')
    assert((window as any).t2crypto,'t2crypto is not defined')

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

    resolve(true);
  });

}
const  securityQuestions = () => {
  return new Promise((resolve, reject) => {
      const state = securityStoreTest.getState();

      assert(state.pinQuestionIds,"state.pinQuestionIds is empty");

      assert(state.pinQuestions,"state.pinQuestions is empty");

      assert(state.pinQuestions.QUESTION_OPT_1,"state.pinQuestions.QUESTION_OPT_1 is empty");
      assert(state.pinQuestions.QUESTION_OPT_2,"state.pinQuestions.QUESTION_OPT_2 is empty");
      assert.equal(SecurityAnswer3, 'NA',"SecurityAnswer3 Placeholder Incorrect");

      resolve(true);
  });
}

const initLoginTest = () => {
  return new Promise((resolve, reject) => {
      let state = securityStoreTest.getState();
      assert.equal(state.selectedPinQuestionIds[0],'QUESTION_OPT_NONE','Question 1 initial value should be "QUESTION_OPT_NONE"')
      assert.equal(state.selectedPinQuestionIds[1],'QUESTION_OPT_NONE','Question 2 initial value should be "QUESTION_OPT_NONE"')

      assert(state.mode === 1,'state.mode should be set to 1 before login');

      assert(state.rikey.length === 0,'state.rikey should be empty string before login');




      securityStoreTest.dispatch(cordovaInitLogin(validLoginInit1))
        .then(() => {
          console.log('cordovaInitLogin promise resovlved');
          let state = securityStoreTest.getState();
          console.log(state);
          try {
            assert.equal(state.selectedPinQuestionIds[0],'QUESTION_OPT_1','Question 1 not set correctly in initLogin')
            assert.equal(state.selectedPinQuestionIds[1],'QUESTION_OPT_2','Question 2 not set correctly in initLogin')
          
            assert.equal(state.mode,0,'state.mode should be set to 0 on valid loginInit asdf');
          }catch(e){
            console.log(e);
          }
          
          assert(state.rikey.length > 10,'state.rikey should be set to non empty string of at least 10 charactors');
          resolve(state);
        }).catch(function(e){
            console.log(e);
            reject(e);
        });

  });
}

const changePinWithPinTest = (initState) => {
  console.log('changePinWithPinTest called');
  return new Promise((resolve, reject) => {
      
      const unsubscribe = securityStoreTest.subscribe(function(){
          unsubscribe();
          let state = securityStoreTest.getState();

          assert.equal(state.mode,1,'state.mode should be set to 1 after witchToSecurityProvider dispatched');
          
          securityStoreTest.dispatch(changePinWithPin(invalidPinChange1)).then(() => {
            console.log('changePinWithPin(invalidPinChange1) test promise fullfiled');
            return securityStoreTest.getState();
          },(e) => {
            console.log('expected error this is ok');
            console.log(e);
          }).then(function(state){
            assert.equal(securityStoreTest.getState().mode ,1,'state.mode should still be set to 1 after invalid login');
            console.log("state.mode === 1");
            return true;
          }).then(() => {
            return securityStoreTest.dispatch(changePinWithPin(validPinChange1));
          }).then(() => {
            assert.equal(securityStoreTest.getState().mode,0,'state.mode should be set to 0 after valid pin change');

            console.log("state.mode === 0");
            resolve(validPinChange1.newPin);
          }).catch((e) => {
            console.log(e);
            reject(e);
          });
          
      });

      securityStoreTest.dispatch(switchToSecurityProvider());
      console.log('switchToSecurityProvider dispatched');
  });
}


const loginWithCorrectPinTest = (validPin) => {
  console.log('loginWithCorrectPinTest called');


  
  return new Promise((resolve, reject) => {
      const unsubscribe = securityStoreTest.subscribe(function(){
          unsubscribe();
          assert.equal(securityStoreTest.getState().mode,1,'state.mode should be set to 1 after switchToSecurityProvider dispatched 400');
          securityStoreTest.dispatch(cordovaLoginWithPin(validPin)).then(() => {
            assert.equal(securityStoreTest.getState().mode,0,'state.mode should be set to 0 after valid Login 401');
            resolve(validPin);
            return true;
          }).catch((e) => {
            if(__DEVTOOLS__){
              console.log("error caught in loginWithCorrectPinTest");
              console.log(e);
            }
            reject(e);
          });
      });

      securityStoreTest.dispatch(switchToSecurityProvider());
  });
}

const changePinWithAnswersTest = (validPinChangeData) => {
  console.log('changePinWithAnswersTest called');
  return new Promise((resolve, reject) => {
      const unsubscribe = securityStoreTest.subscribe(function(){
          unsubscribe();
          assert.equal(securityStoreTest.getState().mode,1,'state.mode should be set to 1 after switchToSecurityProvider (aka logout) dispatched 402');
          securityStoreTest.dispatch(changePinWithAnswers(validPinChangeData)).then(() => {
            assert.equal(securityStoreTest.getState().mode,0,'state.mode should be set to 0 after valid Login 401');
            return validPinChangeData.newPin;
          }).then(function(newPin){
            return loginWithCorrectPinTest(newPin);
          })
          .then(function(correctPin){
            resolve(correctPin);
          })
          .catch(function(e){
            if(__DEVTOOLS__){
              console.log("error caught in changePinWithAnswersTest");
              console.log(e);
            }
            reject(e);
          });
      });

      securityStoreTest.dispatch(switchToSecurityProvider());
  });
}

const changeSecurityQuestionsTest = (validPin) => {
  assert.equal(validChangeQuestionsWithPin.currentPin,validPin,'Invalid Pin change from previous test');
  return securityStoreTest.dispatch(changeSecurityQuestions(validChangeQuestionsWithPin))
        .then(() => {
            let newPinChangeWithAnsers:ChangePinWithQuestionsFormInterface = {
              answer1: validChangeQuestionsWithPin.answer1,
              answer2: validChangeQuestionsWithPin.answer2,
              newPin: validPin
            };
            return changePinWithAnswersTest(newPinChangeWithAnsers);
        })

}


export class CordovaTests{
  throwOnError: boolean
  constructor(throwOnError: boolean = true){
    this.throwOnError = throwOnError;
  }
  errorMsg = (msg: string) => {
    console.log("");
  }

  succesMsg = (mgs) => {

  }

  start(){
    try{
      console.log('|TESTING START|: starting cordova t2crypto tests');
      
      ensureCordovaAndPlugins()
        .then(() => {
          console.log('PASSED: ensureCordovaAndPlugins');
          return securityQuestions()
        })
        .then(() => {
          console.log('PASSED: securityQuestions');
          return initLoginTest()
        }).then(function(result){
          console.log('PASSED: initLoginTest');
          return changePinWithPinTest(result);
        })
        .then((newPin) => {
          console.log('PASSED: changePinWithPinTest');
          return loginWithCorrectPinTest(newPin)
        })
        .then(function(result){
          console.log('PASSED: loginWithCorrectPinTest');
          return changePinWithAnswersTest(validPinChangeWithAnswers);
        })
        .then((validPin) => {
          console.log('PASSED: changePinWithAnswersTest');
          return changeSecurityQuestionsTest(validPin);
        })
        .then(() => {
          console.log('PASSED: changeSecurityQuestionsTest');
          return true;
        })
        .then(function(result){
          console.log('|TESTING END|: CORDOVA COMPLETE');
        })
        .catch((e) => {
            console.log("|FAILED|: CORDOVA TEST FAIL")
            
            console.log('|FAILED MESSAGE|: ' + e.message);
            if(__DEVTOOLS__){
              console.log(e);
            }
            if(this.throwOnError){
                throw e;
            }
        });
    }catch(e){

      if(__DEVTOOLS__){
        console.log(e);
      }
      if(this.throwOnError){
          throw e;
      }
    }
    
  }
}
