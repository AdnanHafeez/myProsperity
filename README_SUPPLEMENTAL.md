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

## dev
The git dev branch of this app is currently deployed as Beta on Android and iOS app stores.

## feature-unified-cryptostore
This branch will be the upcomming version to be merged into dev. It features a simpler
architecture based on lessons learned from the current dev branch. It is 90% complete
but has not been through QA.

## Which Branch to USE?
If you're intention is to quickly patch an issue on the currently deployed app
you should probably use the dev branch.

If you are working on a new release and have more than a couple days it will probably take less effort to get feature-unified-cryptostore up and running.

# Starting Points

## PlainRoutes - src/app/PlainRoutes.tsx
This could be called the nexus of the app. It handles:

+ Initialization of t2crypto and data persistence.
+ Loads the UI
+ Listens for cordova device events

# Storage
The following information is with respect to the dev branch and assumes you are familiar
with redux and redux-persist.

Because of the nature of how redux and redux-persist work it was difficult in incorporate t2crypto
with this project. This is because redux "expects" all of the data stored by redux-persist to be loaded 
when the app is loaded/restarted. The problem is we don't want the encrypted data to be decrypted on app 
load but rather after the user has entered the their pin. 
The solution was to create two "databases" corresponding to two different state trees:
+ One to handle authentication (pin setup, security questions, etc) which is not encrypted
+ The other "database" is for containing all the data we want encrypted.
How it works is the 2nd Encrypted database is not loaded until the user has authenticate themselves.

While this approach makes sense it violates a best practice of redux which states that there should only
be one state tree per app. Consequently the app is less organized and more costly to maintain.
That is why the feature-unified-cryptostore branch was created. 















