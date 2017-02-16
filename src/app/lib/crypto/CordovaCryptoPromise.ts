import {CryptoPromiseInterface,CryptoInterface,DataInInterface} from './interface';

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