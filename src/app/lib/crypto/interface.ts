export interface CryptoInterface {
  encryptRaw(data:DataInInterface,success:any): void;
  decryptRaw(data:DataInInterface,success:any,error:any): void;
  changeAnswersUsingPin(data: ChangeAnswersWithPinInterface, success:any, error:any): void;
  changePinUsingPin(data: ChangePinWithPinInterface, success:any, error:any);
  changePinUsingAnswers(data: ChangePinWithAnswersInterface, success:any, error:any): void;
  checkPin(data: CheckPinInterface, success:any, error:any): void;
  getDatabaseKeyUsingPin(data: CheckPinInterface, success:any, error:any): void;
}

export interface DataInInterface { //TODO fix name
  KEY_PIN: string;
  KEY_INPUT: any;
}

export interface CryptoPromiseInterface {
  encryptRaw(data:DataInInterface): Promise<string>;
  decryptRaw(data:DataInInterface): Promise<string>;
  changeAnswersUsingPin(data: ChangeAnswersWithPinInterface): Promise<boolean>;
  changePinUsingPin(data: ChangePinWithPinInterface): Promise<string>;
  changePinUsingAnswers(data: ChangePinWithAnswersInterface): Promise<string>;
  checkPin(data: CheckPinInterface): Promise<boolean>;
  getDatabaseKeyUsingPin(data: CheckPinInterface): Promise<string>;

}
export interface ChangeAnswersWithPinInterface {
   KEY_PIN: string;
   KEY_SECURITY_ANSWER_1: string;
   KEY_SECURITY_ANSWER_2: string;
   KEY_SECURITY_ANSWER_3: string;
}

export interface ChangePinWithAnswersInterface {
   KEY_NEW_PIN: string;
   KEY_SECURITY_ANSWER_1: string;
   KEY_SECURITY_ANSWER_2: string;
   KEY_SECURITY_ANSWER_3: string;
}


export interface ChangePinWithPinInterface{
   KEY_PIN: string;
   KEY_NEW_PIN: string;
}

export interface CheckPinInterface{
  KEY_PIN: string;
}
