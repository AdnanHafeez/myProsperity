import {PromisePeristerTransform,BrowserCryptoPromise} from '../app/lib/crypto';


describe('Testing data flow for promise-based persistor', () => {
  const cryptoPromise = new BrowserCryptoPromise();
  const plainFields = ['migrations','navigation','routing','view','onLogout','user'];
  const encryptFields = ['workbooks','workbookIds','goals','notes','noteIds'];
  const lockableFields = ['workbooks','workbookIds','goals','notes','noteIds'];  
  const key = 'asdfasddoesn';
  const transformer = new PromisePeristerTransform(
                            cryptoPromise,
                            plainFields,
                            encryptFields,
                            lockableFields
                          );

   test('locking feature UNLOCKED for lockableFields',(done) => {
     transformer.unLock(key);
     lockableFields.forEach((field) => {
       expect(transformer.allowIncomming(field)).toBe(true);
     });
     done();
   })


   test('locking feature LOCKED for lockableFields',(done) => {
     transformer.lock();
     lockableFields.forEach((field) => {
       expect(transformer.allowIncomming(field)).toBe(false);
     });
     done();
   })



});