import createPersistorAdapter from '../persistStoreAdapter';
import createPromiseTransform from '../createPromiseTransform';


interface CryptoInterface {
  encryptRaw(data:DataInInterface,success:any): void;
  decryptRaw(data:DataInInterface,success:any,error:any): void;
}

interface DataInInterface {
  KEY_PIN: string;
  KEY_INPUT: any;
}

interface CryptoPromiseInterface {
  encryptRaw(data:DataInInterface): Promise<any>;
  decryptRaw(data:DataInInterface): Promise<any>;
}

export class CordovaCryptoPromise implements CryptoPromiseInterface {
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
                  let err = {
                    message: 'decription operation failed',
                    code: 500
                  };
                  rejectDecrypt(err);
                }
            },(er) => {
              console.log("Error cb is implemented");
              console.log(er);
            });
      });
  }
}

export class BrowserCryptoPromise implements CryptoPromiseInterface {
  crypto: CryptoInterface = null;
  debug: boolean = false;

  constructor(crypto:CryptoInterface = null){
    this.crypto = crypto;
  }

  setCrypto = (crypto:CryptoInterface) => {
    this.crypto = crypto;
  }

  encryptRaw = (data:DataInInterface) => {
      return new Promise((resEncrypt,rejEncrypt) => {
         return resEncrypt(data.KEY_INPUT);
      });
  }

  decryptRaw = (data:DataInInterface) => {
      return new Promise((resolveDecrypt,rejectDecrypt) => {
                    resolveDecrypt(data.KEY_INPUT);
      });
  }
}

export class PromisePeristerTransform {
    cryptoPromise: CryptoPromiseInterface;
    debug: boolean = false;
    blackList: string[]; //do no persist
    doNotEncrypt: string[];
    private locked: boolean = true;
    private key: string = '';

    constructor(crypto:CryptoPromiseInterface,blackList = [],doNotEncrypt = []){
      this.cryptoPromise = crypto;
      this.blackList = blackList;
      this.doNotEncrypt = doNotEncrypt;
    }

    isLocked = () => {
      return this.locked;
    }

    lock = () => {
      this.locked = true;
      this.key = '';
    }

    unLock = (key) => {
      this.locked = false;
      this.key = key;
    }

    allowIncomming = (key) => {


      //if blacklisted then don't allow in or out
      if(this.blackList.indexOf(key) > -1){
        return false;
      }

      //if it is not encrypted then always allow in and out regargless of this.locked
      if(this.doNotEncrypt.indexOf(key) > -1){
        return true;
      };
      return !this.locked;
    }

    allowOutgoing = (key) => {
      return this.allowIncomming(key);
    }

    transform = () => {

      return createPromiseTransform(
          // transform state coming from redux on its way to being serialized and stored

          ({inboundState, key}) => {
            return new Promise((res,rej) => {
                let dataJSON = {
                            "KEY_PIN": this.key,
                            "KEY_INPUT": inboundState
                          };
               

                if(this.allowIncomming(key)){
                  console.log('YESSS allowing Incomming "' + key +'" ');
          
                  this.cryptoPromise.encryptRaw(dataJSON)
                    .then((result) => {
                       console.log(result);
                       res(result);
                    })
                    .catch((e) => {
                        rej(e);
                    });
                }else{
                  console.log('NOT allowing Incomming');
                  res(); //we retern nothing in which case the persistor should not change persisted data
                         //In other words it should not change, add, or remove data.
                }
            });
          },
          // transform state coming from storage, on its way to be rehydrated into redux
          ({outboundState, key}) =>  {
            return new Promise((res,rej) => {
                let dataJSON = {
                            "KEY_PIN": this.key,
                            "KEY_INPUT": outboundState
                          };
                if(this.allowOutgoing(key)){
                  this.cryptoPromise.decryptRaw(dataJSON)
                    .then((result) => {
                       res(result);
                    })
                    .catch((e) => {
                        rej(e);
                    });
                }else{
                  res(null);
                }
            });
          }
        );
    }

}


