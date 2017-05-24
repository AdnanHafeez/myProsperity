function errorLoading(err) {
 console.error('Dynamic page loading failed', err);
}


function loadRoute(cb) {
 return (module) => cb(null, module.default);
}


export const asynRouteMaker = (config: any = {}) => {

  return (route: string,component: Promise<any>, childRoutes: any[] =[],indexComponent: any = null) => {
      return {
       path: route,
         getComponent(location, cb) {
            component.then(loadRoute(cb)).catch(errorLoading);
         },
        childRoutes,
       
        indexRoute: indexComponent ? { component: indexComponent} : null
      }
  }
}

export const syncRoute = (route: string,component: any, childRoutes: any[] =[],indexComponent: any = null) => {
  return {
       path: route,
       component: component,
       childRoutes,
       
       indexRoute: indexComponent ? { component: indexComponent} : null
  }
}


export namespace Validators {
  export const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  export const isDate = (input) => {
    return Object.prototype.toString.call(input) === '[object Date]'
  }
}


export namespace Transforms {
  export const dateToMS = (input, ifInvalid = -1) => {
    if(Validators.isDate(input)){
      return input.getTime();
    }
    return ifInvalid;
  }

  export const msToDate = (input, ifInvalid = null) => {

    if(Validators.isNumeric(input) && input >= 0){
      let tmpdate = new Date();
      tmpdate.setTime(input);
      return tmpdate;
    }


    return ifInvalid;
  }
}

export namespace Formats {
  export const dateToString = (input: Date, format: any = '') => {
    return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear();
  }
  export const msToString = (input: number, format: any = '') => {
    let tmpDate = new Date();
    tmpDate.setTime(input);
    return dateToString(tmpDate);
  }

}


