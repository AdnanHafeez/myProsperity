import * as React from 'react';
import * as ReactDOM from 'react-dom';
const {render} = ReactDOM;
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import Routes, {onCordovaDeviceReady} from './PlainRoutes'; // Our custom react component
import './reducers';
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
    if(__DEVTOOLS__){

       /*
      console.log("Running t2crypto test");
      console.log(t2crypto);
      var error = function(message) { console.log("!! FAILED !! API returned: " + message); };
      var success = function(echoValue) { console.log("--SUCCESS-- API returned: " + echoValue); };

      t2crypto.fipsStatus(function(fipsresult){

        console.log('status success');
        console.log(fipsresult);
      },
        function(err){
        console.log('status error');
        console.log(err);

        });
      
      t2crypto.setApiTestFlag("0", success, error);
        var init = { TAG: "Initializing T2Crypto" };

      t2crypto.initT2Crypto(init, function(args){
        if(args.RESULT === 0) {
          console.log("T2Crypto initialized");
        }
        else {
          console.log("Error during T2Crypto initialization: " + args.RESULT);
        }
      },(err) => {
        console.log('Error on t2crypto init');
        console.log(err);

      }); 

      t2crypto.setVerboseLogging({"VERBOSE_LOGGING": "1"}, function(result) {
          console.log("Verbose Logging success cb");
          console.log(result);
      });

      let dataJSON = {
        "KEY_PIN": 'mumblemumble',
        "KEY_INPUT": '{"test": "data"}'
      };
      var encryptedData;
      t2crypto.encryptRaw(dataJSON,function(result) {
          console.log(result);
          encryptedData = result.RESULT;
      },function(error) {
          console.log("Enc error");
          console.log('error');
      });


      setTimeout(() => {
        console.log('decrypting data');
        console.log(encryptedData);
        let decDataJSON = {
          "KEY_PIN": 'mumblemumble',
          "KEY_INPUT": encryptedData
        };
        t2crypto.decryptRaw(decDataJSON,function(result) {
            console.log(result);
            encryptedData = result.RESULT;
        },function(error) {
            console.log("Enc error");
            console.log(error);
        });

      },1000);
       */


    }


    render(<Routes />, document.getElementById('app'));
    onCordovaDeviceReady();
  }, false);
}

onPageLoad();

if(!__IS_CORDOVA_BUILD__){
    if(__DEVTOOLS__){
      console.log("App root rendered via browser");
    }
  render(<Routes />, document.getElementById('app'));
}

