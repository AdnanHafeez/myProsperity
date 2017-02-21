import {
  CryptoPromiseInterface,
  CryptoInterface,
  DataInInterface,
  ChangeAnswersWithPinInterface,
  ChangePinWithAnswersInterface,
  ChangePinWithPinInterface,
  CheckPinInterface
} from './interface';

function errorMessage(message,code){
  return {
    message,
    code
  }
}
export default class CordovaCryptoPromise implements CryptoPromiseInterface {
  crypto: CryptoInterface = null;
  debug: boolean = false;

  constructor(crypto:CryptoInterface = null){
    this.crypto = crypto;
  }

  setCrypto = (crypto:CryptoInterface) => {
    this.crypto = crypto;
  }

  encryptRaw = (data:DataInInterface) => {
      return new Promise((res,rej) => {
          this.crypto.encryptRaw(data,(result) => {
              if(result.RESULT !== -1){
                if(this.debug){
                  console.log('inbound enc '+ result.RESULT);
                  console.log(result.RESULT)
                }

                res(result.RESULT);
              }else{
                let err = {
                  message: 'inbound encryption failer',
                }
                if(this.debug){
                  console.log(err);
                }
                rej(err);
              }
          });
      });
  }

  decryptRaw = (data:DataInInterface) => {
      return new Promise((resolveDecrypt,rejectDecrypt) => {
            this.crypto.decryptRaw(data,(result) => {
                if(result.RESULT !== -1){
                    if(this.debug){
                      console.log(result.RESULT);
                    }
                    resolveDecrypt(result.RESULT);
                } else {
                  rejectDecrypt(errorMessage('decription operation failed',500));
                }
            },(er) => {
              console.log("Error cb is implemented");
              console.log(er);
            });
      });
  }

  changeAnswersUsingPin = (data: ChangeAnswersWithPinInterface) => {
    return new Promise((resolveChangeAnswer,rejectChangeAnswers) => {

        this.crypto.changeAnswersUsingPin(
          data,
          (args) => {
            if(args.RESULT === 0) {
              resolveChangeAnswer(true);
            } else {
              rejectChangeAnswers(errorMessage('Invalid Pin',410));
            }
          },
          (error) => {
            if(this.debug){
              console.log('error changeAnswersUsingPin');
              console.log(error);
            }
            rejectChangeAnswers(errorMessage('Invalid Pin',411));
          }
        );
    })
  }

  changePinUsingPin = (data: ChangePinWithPinInterface) => {
    return new Promise((resolvePin,rejectPin) => {
        if(this.debug){
          console.log(data);
        }
        this.crypto.changePinUsingPin(
          data,
          function(args){
            if(args.RESULT === 0) {
                resolvePin(data.KEY_NEW_PIN);
            }else{
              rejectPin(errorMessage('Invalid Pin',408));
            }
          },
          function(error){
            rejectPin(errorMessage('Invalid Pin',408));
          }
        );
    });
  }

  changePinUsingAnswers = (data: ChangePinWithAnswersInterface) => {
    return new Promise((resolveChangePinAnswers,rejectChangePinAnswers) => {
          this.crypto.changePinUsingAnswers(data,(result)=>{
            if(result.RESULT === 0){
               resolveChangePinAnswers(data.KEY_NEW_PIN);
            } else {
                rejectChangePinAnswers(errorMessage('Invalid Answers',406))
            }
          },
          (error)=>{
            rejectChangePinAnswers(errorMessage('Invalid Answers',407));
          });
    });
  }

  checkPin = (data: CheckPinInterface) => {
    return new Promise((resolveLoginPin,rejectLoginPin) => {

        this.crypto.checkPin(data,(result)=>{
          if(result.RESULT === 0){
            resolveLoginPin(true);
          } else {
            rejectLoginPin(errorMessage('Invalid Pin',404));
          }
        },
        (error)=>{
          rejectLoginPin(errorMessage('Invalid Pin',405));
        });
    });
  }

  getDatabaseKeyUsingPin = (data: CheckPinInterface) => {
      return new Promise((resolveRiKey,rejectRiKey) => {
        this.crypto.getDatabaseKeyUsingPin(data,function(args){
           const rikey = args.RESULT; 
           if(this.debug){
             console.log(rikey);
           }
           if(!rikey){
                rejectRiKey(errorMessage('Login Failed.',401));
           }else{
            resolveRiKey(rikey);
           }
        },function(e){
          if(this.debug){
            console.log(e);
          }
          rejectRiKey(errorMessage('Login Failed.',412));
        });
      });
  }
}