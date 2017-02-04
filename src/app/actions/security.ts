export const EDIT_QUESTION_1 = 'T2.SECURITY.EDIT_QUESTION_1';
export const EDIT_QUESTION_2 = 'T2.SECURITY.EDIT_QUESTION_2';
export const EDIT_ALL_QUESTIONS = 'T2.SECURITY.EDIT_ALL_QUESTIONS';
export const SWITCH_TO_APP_PROVIDER = 'T2.SECURITY.SWITCH_TO_APP_PROVIDER';
export const SWITCH_TO_SECURITY_PROVIDER = 'T2.SECURITY.SWITCH_TO_SECURITY_PROVIDER';
export const CORDOVA_DEVICE_READY = 'T2.SECURITY.CORDOVA_DEVICE_READY';
export const PIN_ACCEPTED = 'T2.SECURITY.PIN_ACCEPTED';
export const EULA_ACCEPTED = 'T2.SECURITY.EULA_ACCEPTED';
export const EULA_REJECTED = 'T2.SECURITY.EULA_REJECTED';
export const FIPS_IS_SETUP = 'T2.SECURITY.FIPS_IS_SETUP';
export const CORDOVA_INIT_LOGIN_START = 'T2.SECURITY.CORDOVA_INIT_LOGIN_START';
export const CORDOVA_INIT_LOGIN_SUCCESS = 'T2.SECURITY.CORDOVA_INIT_LOGIN_SUCCESS';
export const CORDOVA_INIT_LOGIN_FAIL = 'T2.SECURITY.CORDOVA_INIT_LOGIN_FAIL';
export const CORDOVA_LOGIN_PIN = 'T2.SECURITY.CORDOVA_LOGIN_PIN';
export const CORDOVA_LOGIN_RIKEY = 'T2.SECURITY.CORDOVA_LOGIN_RIKEY';
export const ERROR_MESSAGE = 'T2.SECURITY.ERROR_MESSAGE';


export interface SetPinFormInterface {
  question1: string;
  question2: string;
  answer1: string;
  answer2: string;
  pin: string;
  pinConfirm: string;
}

export interface ChangePinWithQuestionsFormInterface {
  answer1: string;
  answer2: string;
  newPin: string;
}

export const SecurityAnswer3 = 'NA'

export const cordovaInitLoginStart = () => {
  console.log('cordovaInitLoginStart');
  return {
    type: CORDOVA_INIT_LOGIN_START
  }
}

export const cordovaInitLoginFail = (message, code = 0) => {
  console.log('cordovaInitLoginFail');
  let cordovaInitLoginFailAction = {
    type: CORDOVA_INIT_LOGIN_FAIL,
  }
  return (dispatch, getState) => {
      dispatch(cordovaInitLoginFailAction);
      dispatch(sendErrorMessage(message,code));
  }
}

export const sendErrorMessage = (message,code) => {
  return {
    type: ERROR_MESSAGE,
    message,
    code
  }
}

export const cordovaInitLoginSuccess = (pin) => {
  return {
    type: CORDOVA_INIT_LOGIN_SUCCESS
  }
}

export const cordovaLoginWithRikey = (rikey) => {
  return {
    type: CORDOVA_LOGIN_RIKEY,
    rikey
  }
}

export const cordovaLoginWithPin = (pin) => {
  let localAction = {
    type: CORDOVA_LOGIN_PIN,
    pin
  }
  if(__DEVTOOLS__){
    console.log('cordovaLoginWithPin');
  }
  return (dispatch,getState) => {
    dispatch(localAction);
    if(__IS_CORDOVA_BUILD__){
      dispatch(cordovaGetRiKey(pin));
    } else {
      dispatch(getDummyRiKey(pin));
    }
    
  }
}


export const cordovaGetRiKey = (pin) => {
  return (dispatch,getState) => {
      const dbKeyJson = {
        "KEY_PIN": pin
      };
      console.log(dbKeyJson);
      (window as any).t2crypto.getDatabaseKeyUsingPin(dbKeyJson,function(args){
         const rikey = args.RESULT; 
         if(__DEVTOOLS__){
           console.log(rikey);
         }
         
         if(!rikey){
              dispatch(cordovaInitLoginFail('Login Initialization Failed.',401));
         }else{
              dispatch(cordovaLoginWithRikey(rikey));
         }
      });
  }
}

export const getDummyRiKey = (pin) => {
  const rikey = 'dummykey1234';
  return (dispatch,getState) => {
      dispatch(cordovaLoginWithRikey(rikey));
  }
}
export const cordovaInitLogin = (loginData: SetPinFormInterface) => {
 
  return (dispatch, getState) => {
      dispatch(cordovaInitLoginStart());
      var loginjson = {
        "KEY_PIN" : loginData.pin,
        "KEY_SECURITY_ANSWER_1" : loginData.answer1,
        "KEY_SECURITY_ANSWER_2" : loginData.answer2,
        "KEY_SECURITY_ANSWER_3" : SecurityAnswer3
      };
      console.log(loginjson);
      if(__IS_CORDOVA_BUILD__){
        (window as any).t2crypto.initializeLogin(loginjson,function(args){
          console.log(args);
              if(args.RESULT === 0) {
                dispatch(cordovaGetRiKey(loginData.pin));
                dispatch(editAllQuestions(loginData.question1, loginData.question2));
              } else {
                dispatch(cordovaInitLoginFail('Login Initialization Failed.',400));
              }
        },
        function(error){
          if(__DEVTOOLS__){
            console.log('initializeLogin Error');
            console.log(error);
          }
          dispatch(cordovaInitLoginFail('Login Initialization Failed.',403));
        });
      } else {
         dispatch(editAllQuestions(loginData.question1, loginData.question2));
         dispatch(getDummyRiKey(loginData.pin));
      }
  }
}

export const eulaRejected = () => {
  return {
    type: EULA_REJECTED
  }
}

export const fipsIsSetup = () => {
  return {
    type: FIPS_IS_SETUP
  }
}

export const eulaAccepted = () => {
  return {
    type: EULA_ACCEPTED
  }
}

export const cordovaDeviceReady = () => {
  return {
    type: CORDOVA_DEVICE_READY
  }
}

export const editQuestion = (type:string,questionId:string,answer: string) => {
  return {
    type,
    questionId,
    answer
  }
}

export const switchToAppProvider = (rikey) => {
  if(__DEVTOOLS__){
    console.log('rikey: ' + rikey);
  }
  return {
    type: SWITCH_TO_APP_PROVIDER,
    rikey
  }
}

export const switchToSecurityProvider = () => {
  return {
    type: SWITCH_TO_SECURITY_PROVIDER
  }
}

export const editQuestion1 = (questionId:string,answer: string) => {
  return editQuestion(EDIT_QUESTION_1, questionId, answer);
}

export const editQuestion2 = (questionId:string,answer: string) => {
  return editQuestion(EDIT_QUESTION_2, questionId, answer);
}


export const editAllQuestions = (question1Id:string,question2Id:string) => {
  return {
    type: EDIT_ALL_QUESTIONS,
    question1Id,
    question2Id
  }
}
