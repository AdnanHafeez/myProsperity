# Overview
This document is intended for Developers.

This project was intended to be created in a short period of time to demonstrate
the quick building and deployment of a Cross-Platform cordova app. While this app
did go through QA and other manual testing it is consider to be a Beta stage.
As this is the first iteration using this particular stack a dev might find the organization of the app may be confusing hence the creating of this supplemental
document.

# Prerequisites
Developers working on this app should be familiar with the following framewords/libs
## Typescrypt 2.x
## ES6
## React js
## Redux http://redux.js.org/
## Redux Persist https://github.com/rt2zz/redux-persist
## Cordova 6.x
## Webpack version 1.x

# Version Controll Branches

## Current Repo: git clone ssh://<yourusername>@git.t2.local/git/mobile/crossplatform/myProsperity.git
# branch dev
The dev branch of this git repo is currently deployed as Beta on Android and iOS app stores.

## New repo: git clone ssh://<yourusername>@git.t2.local/git/mobile/crossplatform/my-prosperity.git
# branch master
This repo and branch is inteneded to be the new version of the prosperity app. It features a simpler
architecture based on lessons learned from the the first repp. It is 90% complete
but has not been through QA. 

## Which Repo to USE?
If you're intention is to quickly patch an issue on the currently deployed app
you should probably use the myProsperity.git repo dev branch.

If you are working on a new release and have more than a couple days it will probably take less effort to get my-prosperity.git repo up and running on the master branch.

# Starting Points

## PlainRoutes - src/app/PlainRoutes.tsx
This could be called the nexus of the app. It handles:

+ Initialization of t2crypto and data persistence.
+ Loads the UI
+ Listens for cordova device events
+ Routing

# Storage
The following information is with respect to the current myProsperity.git dev branch and assumes you are familiar
with redux and redux-persist.

Because of the nature of how redux and redux-persist work it was difficult in incorporate t2crypto
with this project. This is because redux "expects" all of the data stored by redux-persist to be loaded 
when the app is loaded/restarted. The problem is we don't want the encrypted data to be decrypted on app 
load but rather only after the user has entered the their pin. 
The solution was to create two "databases" corresponding to two different state trees:
+ One data store is to handle authentication (pin setup, security questions, etc) which is not encrypted
+ The other data store is for containing all the data we want encrypted.
How it works is the 2nd Encrypted database is not loaded until the user has authenticate themselves.

While this approach makes sense it violates a best practice of redux which states that there should only
be one state tree per app. Consequently the app is less organized and more costly to maintain.
That is why the new repo (see above) was created. The new repo features a single store.















