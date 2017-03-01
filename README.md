My Workbook
# For more detail see README_SUPPLEMENTAL.md
## Installation

# Requirments (the minor and patch versions should not matter) I installed for nodejs site
# I use the LTS version v6.x.x  from https://nodejs.org/en/download/
# I think npm is bundled with node

#If you are only interested in building in android and ios you can skip down to the "cordova" section


# I'm using
nodejs version v6.9.4
npm version 3.10.10

# you need typescript 
npm install -g typescript
# I'm using Version 2.1.5

# you need cordova and installed globally
npm install -g cordova
#I'm on version 6.5.0


https://www.typescriptlang.org/#download-links

# git checkout
git clone ssh://<yourusername>@git.t2.local/git/mobile/crossplatform/myProsperity.git
cd myProsperity
git checkout dev

# install all node modules - downloads take a while
# do this if you want to run on the web or make changes to cordova builds html/js files

npm install
#remove some uneeded typescript definitions
npm uninstall @types/react-router

# run dev server so you can develope in browser 
# changes in files should cause app to reload 
# launches at localhost:3012

npm start

 #to build web js files for cordova
 # this just bundles the web application files and installs the js in the cordova subdirectory of the project
 #NOTE if you haven't changed the html js of the project you can skip the command just below.
 npm run build-cordova
 
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
