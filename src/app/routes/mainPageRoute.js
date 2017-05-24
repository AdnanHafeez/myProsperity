
import Main from '../Main.tsx';
import {syncRoute} from '../lib/helpers.ts';
import DirectorsGoals from '../DirectorsGoals.tsx';
import MessageFromDirector from '../Intro.tsx';
import HomePage from '../HomePage.tsx';
import WorbookContainer from '../WorkbookContainer.tsx';
import {AppStatusContainer} from 'local-t2-app-redux/lib/components';
import NotesContainer from '../NotesContainer.tsx';
import ResourcesPersonal from '../appcomponents/resources/Personal.tsx'
import ResourcesProfessional from '../appcomponents/resources/Professional.tsx'
import ResourcesSpiritual from '../appcomponents/resources/Spiritual.tsx'
import ResourcesRelationships from '../appcomponents/resources/Relationships.tsx'
import ResourcesWebinars from '../appcomponents/resources/Webinars.tsx'

export default {
  path: 'main',
  getComponent (nextState, cb) {
    cb(null, Main);
  },
  name: 'main',
  getChildRoutes (partialNextState, cb) {
      cb(null, [
        syncRoute('intro',DirectorsGoals),
        syncRoute('home', HomePage),
        syncRoute('message',MessageFromDirector),
        syncRoute('goals',DirectorsGoals),
        syncRoute('workbook/:id',WorbookContainer),
        syncRoute('notes',NotesContainer),
        syncRoute('debug',AppStatusContainer),

        syncRoute('res-personal',ResourcesPersonal),
        syncRoute('res-professional',ResourcesProfessional),

        syncRoute('res-spiritual',ResourcesSpiritual),
        syncRoute('res-webinars',ResourcesWebinars),
        syncRoute('res-relationships',ResourcesRelationships)
      ]);
  }
};
