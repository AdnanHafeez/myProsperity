import {CryptoPromiseInterface,CryptoInterface,DataInInterface} from './interface';

export default class BrowserCryptoPromise implements CryptoPromiseInterface {
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
