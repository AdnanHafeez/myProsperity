declare module 'local-t2-device-redux' {

  export const deviceActions: any;
  export const deviceReducer: any;
}

declare module 'local-t2-navigation-redux' {
  export const navigationCreateMiddleware: any;
  export const navigationReducer: any;
}


declare module 'local-t2-app-redux' {
  export const appSaga: any;
  export const registerPromise: any;
  export const appReducer: any;
}

declare module 'local-t2-app-redux/lib/components' {
   export const UpdateDialogContainer: any;
}

declare module 'redux-persist-migrate' {
    export function createMigration(a: any, b: any): any;
    export default createMigration;
}

declare const createMigration: any;


declare const __INCLUDE_SERVICE_WORKER__: any;
declare const __DEVTOOLS__: any;
declare const __IS_CORDOVA_BUILD__: any;
declare const __CORDOVA_TEST_ONLY__: boolean;
declare const t2crypto: any;
declare const cordova: any;




