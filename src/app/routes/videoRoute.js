import VideoPage from '../VideoContainer.tsx';

const dynamicVideoPage = {
  path: 'video/:id',

  getComponent(nextState, callback) {
    console.log('video page called')
    //require.ensure([], function (require) {
      callback(null, VideoPage)
    //})
  }
};


export default dynamicVideoPage;