import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {GridList, GridTile} from 'material-ui/GridList';
import { Link, browserHistory } from 'react-router';

import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import { toggleT2AppFromMyList, showFlashMessage} from './actions';
import { List, Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import Connectivity from './Connectivity';
import OnlineOnlyLink from './OnlineOnlyLink';
const styles = {
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  },
  playIcon: {
    marginRight: 24
  },
  container: {
  }
};

interface MyProps {
  appBarTitle(title: string): any;
  videoList: any[];
  toggleToMyApps(id: number): any;
  flashMessage(msg: string): any;
  device: any
}

interface MyState {

}

class VideosPage extends React.Component<MyProps, MyState> {
  componentWillMount(){
      this.props.appBarTitle && this.props.appBarTitle('Anger Videos');
  }
  render(){

  var {videoList, toggleToMyApps, flashMessage, appBarTitle, device} = this.props;

    var cols = 2;
    if(device.size === 'large'){
      cols = 4;
    } else if (device.size === 'small'){
      cols = device.orientation !== 'landscape' ? 1 : 2;
    }
    return (
    <div>
      <GridList
        style={styles.gridList}
        cols={cols}
      >

        {videoList.map((tile) => (

          <OnlineOnlyLink isOnline={true} key={tile.id} to={'/main/video/'+tile.id} cols={tile.featured ? 1 : 1}>
            <GridTile
              key={tile.id}
              {...tile}
              actionPosition="right"
              titlePosition="top"
              actionIcon={<IconButton><PlayIcon color={'white'} {...tile}  /></IconButton>}
            >
              <img src={tile.img} />
            </GridTile>
          </OnlineOnlyLink>
        
         
        ))}
      </GridList>

    </div>);
  }

};

const mapStateToProps = (state) => {
  return {
    videoList: Map(state.videos).toArray(),
    device: state.device
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => dispatch(toggleT2AppFromMyList(id)),
    flashMessage: (text) => dispatch(showFlashMessage(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideosPage);
