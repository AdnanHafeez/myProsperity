export interface CryptoInterface {
  encryptRaw(data:DataInInterface,success:any): void;
  decryptRaw(data:DataInInterface,success:any,error:any): void;
}

export interface DataInInterface {
  KEY_PIN: string;
  KEY_INPUT: any;
}

export interface CryptoPromiseInterface {
  encryptRaw(data:DataInInterface): Promise<any>;
  decryptRaw(data:DataInInterface): Promise<any>;
}