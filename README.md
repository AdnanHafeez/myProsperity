My Workbook
# For more detail see README_SUPPLEMENTAL.md
## Installation

# Requirments (the minor and patch versions should not matter) I installed for nodejs site
# I use the LTS version v6.x.x  from https://nodejs.org/en/download/
# I think npm is bundled with node

#If you are only interested in building in android and ios you can skip down to the "cordova" section. However if you would like to modify and or build the javascript bundle then read on.


# Install nodejs
nodejs version v6.9.4
npm version 3.10.10
+ I install from https://nodejs.org/en/download/

# Install Typescript 
# https://www.typescriptlang.org

npm install -g typescript
+ I'm using Version 2.2.1

# Install cordova
npm install -g cordova
+ I'm on version 6.5.0

# install webpack
you need to install webpack !!Important!! make sure it is version 1.x (not 2.x)
npm install --save-dev webpack

Checkout Project

# git checkout
git clone ssh://<yourusername>@git.t2.local/git/mobile/crossplatform/myProsperity.git
cd myProsperity
git checkout dev

# npm install
Install all node modules - downloads take a while.
Do this if you want to run the site on the web or make changes to cordova build's html/js files.
You may get module dependency warnings or errors at this point. In many cases you can ignore these 
but please report them. If the "npm start" command below works and you don't get errors in the browser then you're probably good.

# npm start
The command above will run dev server at localhost:3012 so you can develope in a browser. 
Changes in files should cause app to reload 


# npm build-cordova
This command builds and bundles the web js files used by both cordova platform builds (Android and iOS) Essentially this just bundles the web application files and installs the js in the cordova subdirectory of the project. You would only need to run this command if you have made changes to the js source files.

 
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
 
  ____       _    __                             ___     ____  _             _           
 |  _ \ __ _| |_ / _| ___  _ __ _ __ ___  ___   ( _ )   |  _ \| |_   _  __ _(_)_ __  ___ 
 | |_) / _` | __| |_ / _ \| '__| '_ ` _ \/ __|  / _ \/\ | |_) | | | | |/ _` | | '_ \/ __|
 |  __/ (_| | |_|  _| (_) | |  | | | | | \__ \ | (_>  < |  __/| | |_| | (_| | | | | \__ \
 |_|   \__,_|\__|_|  \___/|_|  |_| |_| |_|___/  \___/\/ |_|   |_|\__,_|\__, |_|_| |_|___/
                                                                       |___/   
# This project uses one custom plugin called "cordova-plugin-t2crypto" so there are some "non-standard" steps to take
before we install our platforms and plugins


# Please clone cordova-plugin-t2crypto it to a location outside this project:
git clone ssh://<username>@git.t2.local/git/mobile/crossplatform/cordova-plugin-t2crypto.git
# Please confirm with Bradden C which branch to to checkout.
# I used the dev branch with the last commit as 5e77ed83d4fbb1b853bdee901bdac5a476356994

# now edit cordova/package.json and change this line:
"org.t2crypto": "file:///Users/jack.lightfoot/Documents/projects/js/cordova-plugin-t2crypto"
# to point to wherever you cloned the fips plugin.

# now do the same thing with the path in in cordova/config.xml
<plugin name="org.t2crypto" spec="file:///Users/jack.lightfoot/Documents/projects/js/cordova-plugin-t2crypto" />

# The cordova/platforms and cordova/plugins directories are empty on a fresh clone.
# to install all platforms and plugins mentioned in cordova/config.xml run the command below

cordova prepare

# If cordova prepare doesn't there is probably something that needs to be fixed but you can also manually install platforms and plugins listed in package.json and config.xml

 
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
