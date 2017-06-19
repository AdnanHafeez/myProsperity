# My Workbook
> For more detail see README_SUPPLEMENTAL.md

## Installation

### Install nodejs
nodejs version v6.9.x

npm version 3.x

Install from https://nodejs.org/en/download/

### Install cordova
`npm install -g cordova`

This project was built on version 7.0.1

### git checkout
`git clone ssh://<yourusername>@git.t2.local/git/mobile/crossplatform/myProsperity.git`

`cd myProsperity/`

`git checkout dev`

>### Note
>If you are only interested in building in android and ios you can skip down to the "Cordova" section. However if you would like to modify and or build the javascript bundle then read on.

### npm install

`npm install`

Installs all node modules - downloads take a while.
Do this if you want to run the site on the web or make changes to cordova build's html/js files.
You may get module dependency warnings or errors at this point. In many cases you can ignore these 
but please report them. If the "npm start" command below works and you don't get errors in the browser then you're probably good.

### npm start

`npm start`

The command above will run dev server at localhost:3012 so you can develope in a browser. 
Changes in files should cause app to reload 


### npm build-cordova

`npm build-cordova`

This command builds and bundles the web js files used by both cordova platform builds (Android and iOS) Essentially this just bundles the web application files and installs the js in the cordova subdirectory of the project. You would only need to run this command if you have made changes to the js source files.

 <pre>

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
 
</pre>

# Cordova

### Building Cordova Apps

 `cd cordova/`

you are now in cordova land

<pre>

  ____       _    __                             ___     ____  _             _           
 |  _ \ __ _| |_ / _| ___  _ __ _ __ ___  ___   ( _ )   |  _ \| |_   _  __ _(_)_ __  ___ 
 | |_) / _` | __| |_ / _ \| '__| '_ ` _ \/ __|  / _ \/\ | |_) | | | | |/ _` | | '_ \/ __|
 |  __/ (_| | |_|  _| (_) | |  | | | | | \__ \ | (_>  < |  __/| | |_| | (_| | | | | \__ \
 |_|   \__,_|\__|_|  \___/|_|  |_| |_| |_|___/  \___/\/ |_|   |_|\__,_|\__, |_|_| |_|___/
                                                                       |___/   

</pre>

>### Note
> This project uses one custom plugin called "cordova-plugin-t2crypto" so there are some "non-standard" steps to take before we install our platforms and plugins


### clone cordova-plugin-t2crypto it to a location outside this project:
`git clone ssh://<username>@git.t2.local/git/mobile/crossplatform/cordova-plugin-t2crypto.git`
> Please confirm with Bradden C which branch to to checkout.
> I used the dev branch with the last commit as 5e77ed83d4fbb1b853bdee901bdac5a476356994

now edit cordova/package.json and change this line:

`"org.t2crypto": "file:///Path/To/cordova-plugin-t2crypto"`

to point to wherever you cloned the fips plugin.
now do the same thing with the path in in cordova/config.xml

`
  <plugin name="org.t2crypto" spec="file:///Path/To/cordova-plugin-t2crypto" />
`

The cordova/platforms and cordova/plugins directories are empty on a fresh clone.
To install all platforms and plugins mentioned in cordova/config.xml run the command below

`cordova prepare`

If cordova prepare doesn't there is probably something that needs to be fixed but you can also manually install platforms and plugins listed in package.json and config.xml

> ### Note
>  After removing and re-installing cordova-plugin-t2crypto plugin you must go to each source (.m) file of the 
>  module in the plugins directory and make sure (in XCode) the Target membership checkbox is checked.

>  Alternatively, you can to this
>      In XCode goto Build Phases->Compile sources and add each source (.m) file of the plugins just added
      
>  Here are the files that need to be added:
>+ T2Crypto.m
>+ T2Crypto_I.m
>+ T2Util.m
>+ constants.m

<pre>
  ___            _           _     _  ______       _ _     _ 
 / _ \          | |         (_)   | | | ___ \     (_) |   | |
/ /_\ \_ __   __| |_ __ ___  _  __| | | |_/ /_   _ _| | __| |
|  _  | '_ \ / _` | '__/ _ \| |/ _` | | ___ \ | | | | |/ _` |
| | | | | | | (_| | | | (_) | | (_| | | |_/ / |_| | | | (_| |
\_| |_/_| |_|\__,_|_|  \___/|_|\__,_| \____/ \__,_|_|_|\__,_|
  
</pre>                                                           

## Android Build
 
`cordova build android`
 
To install on device first check that your device is listed otherwise an emulator will fire up

### List Available Devices

`cordova run --list`
 
If your device is listed then the following command should install and launch the app on it

`cordova run android`

<pre>
  _  ___  ___   ___      _ _    _ 
 (_)/ _ \/ __| | _ )_  _(_) |__| |
 | | (_) \__ \ | _ \ || | | / _` |
 |_|\___/|___/ |___/\_,_|_|_\__,_|

</pre>

## iOS Build

for iOS building it's easiest to first build it using cordova then open the project in xCode to launch on a device

### Build with Cordova

>### Note
> If you skip this step the latest js/html files will not go into the iOS build.

`cordova build ios`

Now open the project in xCode and build, distribute, install, debug from xCode.
the xcode project will be located somewhere like cordova/platforms/ios/<MyProjectName>.xcodeproj

# [Web Demo](https://jlightfoot2.github.io/myProsperity/build)


