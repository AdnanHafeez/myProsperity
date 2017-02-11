
interface CryptoInterface {
  encryptRaw(): Promise<any>;
  decryptRaw(): Promise<any>;
}

interface DataInInterface {
  KEY_PIN: string;
  KEY_INPUT: any;
}

class CryptoPromise {
  crypto: CryptoInterface;
  debug: boolean = false;
  constructor(crypto){
    this.crypto = crypto;
  }

  encryptRaw = (data:DataInInterface) => {
      return new Promise(function(res,rej){
          this.crypto.encryptRaw(data,function success(result){
              if(result.RESULT !== -1){
                if(__DEVTOOLS__){
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
      return new Promise(function(res,rej){
          this.crypto.encryptRaw(data,function success(result){
              if(result.RESULT !== -1){
                if(__DEVTOOLS__){
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
}