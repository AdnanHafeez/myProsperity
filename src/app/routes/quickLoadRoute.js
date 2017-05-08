import Main from '../Main.tsx';
import {syncRoute} from '../lib/helpers.ts';
import DirectorsGoals from '../DirectorsGoals.tsx';
import MessageFromDirector from '../Intro.tsx';
import HomePage from '../HomePage.tsx';
import WorbookContainer from '../WorkbookContainer.tsx';
import {AppStatusContainer} from 'local-t2-app-redux/lib/components';
import SplashPage from '../SplashPage';
export default {
  getComponent (nextState, cb) {
    console.log('quick Load comp called');
    cb(null, Main);
  },

  getChildRoutes (partialNextState, cb) {
    cb(null, [
      syncRoute('intro',DirectorsGoals),
      syncRoute('/',MessageFromDirector),
      syncRoute('splash',SplashPage)
    
    ]);
  }
};
