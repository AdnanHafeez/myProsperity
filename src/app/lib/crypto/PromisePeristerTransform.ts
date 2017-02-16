import {CryptoPromiseInterface,CryptoInterface,DataInInterface} from './interface';
import createPromiseTransform from './createPromiseTransform';
export default class PromisePeristerTransform {
    cryptoPromise: CryptoPromiseInterface;
    debug: boolean = false;
    plainFields: string[];
    encryptFields: string[];
    lockableFields: string[];
    activeFields: string[];
    private locked: boolean = true;
    private key: string = '';

    constructor(crypto:CryptoPromiseInterface,
                            plainFields = [],
                            encryptFields = [],
                            lockableFields =[]
                            ){
      this.cryptoPromise = crypto;

      this.plainFields = plainFields;
      this.lockableFields = lockableFields;
      this.encryptFields = encryptFields;
      this.activeFields = this.plainFields.concat(this.lockableFields,this.encryptFields);
      let overlap = this.plainFields.filter((n) => {
          return this.encryptFields.indexOf(n) !== -1;
      });

      if(overlap.length > 0){
        throw 'cannot have a field that is both plain and enscrypted';
      }

      let extraFields = this.lockableFields.filter((lockField) => {
          return this.encryptFields.indexOf(lockField) === -1 && this.plainFields.indexOf(lockField) === -1;
      });
      if(extraFields.length > 0){
        throw 'unregistered fields ' + extraFields.join(', ');
      }

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

    shouldEncrypt(field){
      return this.encryptFields.indexOf(field) > 1;
    }


    allowIncomming = (field) => {

      if(this.activeFields.indexOf(field) === -1){
        return false;
      }

      if(this.lockableFields.indexOf(field) > -1 && this.locked){
        return false;
      }


      return true;
    }

    allowOutgoing = (field) => {
      return this.allowIncomming(field);
    }



    transform = () => {

      return createPromiseTransform(
          // transform state coming from redux on its way to being serialized and stored

          ({inboundState, field}) => {
            return new Promise((res,rej) => {
                let inboundString =  JSON.stringify(inboundState);
                if(!this.allowIncomming(field)){
                  console.log('!!!!!not allowIncomming for ' + field);
                  res(); // return undefined means persistor should ignore it
                } else if(this.shouldEncrypt(field)) {
                   console.log('!!!!!shouldEncrypt ' + field);
                   let dataJSON = {
                                "KEY_PIN": this.key,
                                "KEY_INPUT": inboundString
                              };
               
                  this.cryptoPromise.encryptRaw(dataJSON)
                    .then((result) => {
                       res(result);
                    })
                    .catch((e) => {
                        rej(e);
                    });

                } else {
                  console.log('!!!!!!should be plain ' + field);
                  res(inboundString);
                }
            });
          },
          // transform state coming from storage, on its way to be rehydrated into redux
          ({outboundState, field}) =>  {
    
            return new Promise((res,rej) => {
                if(!this.allowOutgoing(field)){
                  res();
                } else if(this.shouldEncrypt(field)) {
                  let dataJSON = {
                              "KEY_PIN": this.key,
                              "KEY_INPUT": outboundState
                            };

                  this.cryptoPromise.decryptRaw(dataJSON)
                    .then((result) => {
                        //console.log(result);
                       res(result);
                    })
                    .catch((e) => {
                        rej(e);
                    });
                } else {
                  res(outboundState);
                }
            });
          }
        );
    }

}