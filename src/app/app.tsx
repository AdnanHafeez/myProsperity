import * as React from 'react';
import * as ReactDOM from 'react-dom';
const {render} = ReactDOM;
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Routes, {onCordovaDeviceReady} from './PlainRoutes'; // Our custom react component
import './reducers';
import {CordovaTests} from './CordovaTests'
require('file?name=manifest.json!json-file!json!../www/manifest.json');
require('../www/index.html');
require('../www/main.css');
require('../images/icons/appIcon_144.png');
require('../images/icons/appIcon_152.png');
require('../images/icons/appIcon_32.png');



// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
function onPageLoad() {

  document.addEventListener("deviceready", function(){


    
    if(__CORDOVA_TEST_ONLY__){
      const ctest = new CordovaTests();
      ctest.start();
      render(<div>
            <h1>No App Here :)</h1>
            <h3>This is a cordova test version only</h3>
            <p>Check your debugger for test output</p>
            <p>For this test to work properly you mush uninstall app before running</p>
            <p>Or you can close the app, clear the app's data, and restart</p>
            <p>This app was build this way because __CORDOVA_TEST_ONLY__ === true in a webpack config file</p>
          </div>, document.getElementById('app'));




    }else{
      render(<Routes />, document.getElementById('app'));
      onCordovaDeviceReady();
    }
  }, false);
}

onPageLoad();

if(!__IS_CORDOVA_BUILD__){
    if(__DEVTOOLS__){
      console.log("App root rendered via browser");

    }
  render(<Routes />, document.getElementById('app'));
}

