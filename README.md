My Workbook
# For more detail see README_SUPPLEMENTAL.md
## Installation

# Requirments (the minor and patch versions should not matter) I installed for nodejs site
# I use the LTS version v6.x.x  from https://nodejs.org/en/download/
# I think npm is bundled with node

#If you are only interested in building in android and ios you can skip down to the "cordova" section


# Install nodejs
nodejs version v6.9.4
npm version 3.10.10
+ I install from https://nodejs.org/en/download/

# Install Typescript
npm install -g typescript
+ I'm using Version 2.2.1

# Install cordova
npm install -g cordova
+ I'm on version 6.5.0

# install webpack
you need to install webpack !!Important!! make sure it is version 1.x (not 2.x)
npm install --save-dev webpack

https://www.typescriptlang.org/#download-links

# git checkout
git clone ssh://<yourusername>@git.t2.local/git/mobile/crossplatform/myProsperity.git
cd myProsperity
git checkout dev

# npm install
install all node modules - downloads take a while
do this if you want to run the site on the web or make changes to cordova build's html/js files
You may get module dependency warnings or errors at this point. In many cases you can ignore these.
If the "npm start" command below works and you don't get errors in the browser then you're probably good.




# npm start
run dev server so you can develope in a browser. 
Changes in files should cause app to reload 
launches at localhost:3012.

# missing typescript definitions

At this point (running "npm start") you may encounter typescript related build errors. Most of the time 
this is because the type definitions need to be updated or are missing.

For example if you had a typescript error related to the react-router module you could edit package.json from:
...

  "devDependencies": {
    "@types/core-js": "^0.9.34",
    "@types/react-router": "^2.0.1",
...

To:
...

  "devDependencies": {
    "@types/core-js": "^0.9.34",
    "@types/react-router": "*",
...

Then run 
npm install --save-dev @types/react-router

This should update the module itself and this change will be reflected in package.json like so:
...

  "devDependencies": {
    "@types/core-js": "^0.9.34",
    "@types/react-router": "^2.0.49",
... 

# duplicate typescript definitions

Some times you may get typescript errors indicating "duplicate" typescript definitions. This is usually caused
when you install or update a module that is distributed with its own typescript definitions. 
For example if you install "bobs-module" and you install "@types/bobs-module" and you get "duplicate" errors
then usually you simply need to uninstall @types/bobs-module like so:
npm uninstall @types/bobs-module


# npm build-cordova
This to builds and bundles the web js files used by both cordova platform builds (Android and iOS)
Essentially this just bundles the web application files and installs the js in the cordova subdirectory 
of the project.

 
 .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
| |     ______   | || |     ____     | || |  _______     | || |  ________    | || |     ____     | || | ____   ____  | || |      __      | |
| |   .' ___  |  | || |   .'    `.   | || | |_   __ \    | || | |_   ___ `.  | || |   .'    `.   | || ||_  _| |_  _| | || |     /  \     | |
| |  / .'   \_|  | || |  /  .--.  \  | || |   | |__) |   | || |   | |   `. \ | || |  /  .--.  \  | || |  \ \   / /   | || |    / /\ \    | |
| |  | |         | || |  | |    | |  | || |   |  __ /    | || |   | |    | | | || |  | |    | |  | || |   \ \ / /    | || |   / ____ \   | |
| |  \ `.___.'\  | || |  \  `--'  /  | || |  _| |  \ \_  | || |  _| |___.' / | || |  \  `--'  /  | || |    \ ' /     | || | _/ /    \ \_ | |
| |   `._____.'  | || |   `.____.'   | || | |____| |___| | || | |________.'  | || |   `.____.'   | || |     \_/      | || ||____|  |____|| |
| |              | || |              | || |              | || |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 
 


 #Building Cordova Apps
 cd cordova/
 #you are now in cordova land
 

    _           _         _    _     _     _  ___  ___ 
   /_\  _ _  __| |_ _ ___(_)__| |  _| |_  (_)/ _ \/ __|
  / _ \| ' \/ _` | '_/ _ \ / _` | |_   _| | | (_) \__ \
 /_/ \_\_||_\__,_|_| \___/_\__,_|   |_|   |_|\___/|___/
 # if you haven't done so add the android and iOS platforms
 cordova platform add android
 cordova platform add ios

    _      _    _   ___ _           _         
   /_\  __| |__| | | _ \ |_  _ __ _(_)_ _  ___
  / _ \/ _` / _` | |  _/ | || / _` | | ' \(_-<
 /_/ \_\__,_\__,_| |_| |_|\_,_\__, |_|_||_/__/
                              |___/           
 # in a directory outside this project clone t2crypto plugin and checkout Encryption2.0
 # the add it to project like so
 
cordova plugin rm org.t2crypto
cordova plugin add /path/to/cloned/cordova-plugin-t2crypto  

#add the splash screen plugin
cordova plugin add cordova-plugin-splashscreen

#add device info plugin
cordova plugin add cordova-plugin-device
 
 #Android Build
 
 cordova build android
 
 #to install on device first check that your device is listed otherwise an emulator will fire up
 #list available devices
 cordova run --list
 
 #if your device is listed then the following command should install and launch the app on it
 cordova run android

  _  ___  ___   ___      _ _    _ 
 (_)/ _ \/ __| | _ )_  _(_) |__| |
 | | (_) \__ \ | _ \ || | | / _` |
 |_|\___/|___/ |___/\_,_|_|_\__,_|

#iOS Build
# for iOS building it's easiest to first build it using cordova then open the project in xCode to launch on a device
# build with cordova. If you skip this step the latest js/html files will not go into the iOS build.
cordova build ios
# now open the project in xCode and build, distribute, install, debug from xCode.
#the xcode project will be located somewhere like cordova/platforms/ios/<MyProjectName>.xcodeproj







 # [Web Demo](https://jlightfoot2.github.io/myProsperity/build)
