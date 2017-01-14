
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {connect} from 'react-redux';

const styles = {
  video: {
    width: '100%',
    height: 'auto'
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  video: any;
  isOnline: any;
}

interface MyState {

}
class videoViewer extends React.Component<MyProps, MyState> {
  componentWillMount () {
    var {video} = this.props;
    this.props.appBarTitle && this.props.appBarTitle(video.title);
  }
  render () {
    var {video, isOnline} = this.props;
    var onlineVideo = <video style={styles.video} src={video.src} poster={video.img} controls>
      Sorry, your browser doesn't support embedded videos.
    </video>;

    var offlineVideo = 'This video is not available while offline';

    var content = typeof isOnline === 'undefined' || isOnline ? onlineVideo : offlineVideo;
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default videoViewer;
