import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { toggleT2AppFromMyList, showFlashMessage } from './actions';
import { List, Map } from 'immutable';
import AppButtonIcon from './AppButtonIcon';
import { push } from 'react-router-redux';

const styles = {
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  },
  gridTile: {

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};

const categories = [
  {id: 1, title: 'Videos', path: '/main/videos', featured: true, img: require('../images/film-596011_640.png')},
  {id: 2, title: 'Assessments', path: '/main/assessment', featured: false, img: require('../images/2000px-Checklist_Noun_project_5166.svg.png')},
  {id: 3, title: 'Anger Library', path: '/main/library', featured: false, img: require('../images/2000px-Book_font_awesome.svg.png')},
  {id: 4, title: 'Resources', path: '/main/resources', featured: false, img: require('../images/Sharing-icon.svg.png')}
];
interface MyProps {
  appBarTitle(msg: string): any;
  device: any;
  flashMessage(msg: string): any;
  onTileClick(path: string): any;
}

interface MyState {
 
}

class HomePage extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Home');
  }

  render () {
    var {flashMessage, appBarTitle, onTileClick, device} = this.props;

    var cols = categories.length;
    if (device.size === 'small') {
      cols = 2;
    }

    return (
    <div style={styles.container as any}>
      <GridList
        style={styles.gridList}
        cols={cols}
        cellHeight={250}
      >

        {categories.map((tile) => (
          <Link cols={1} key={tile.id} to={tile.path}>
            <GridTile
              key={tile.id}
               {...tile}
              title={tile.title}
              titlePosition='bottom'
              style={{backgroundColor: 'grey'}}
            >
            <img src={tile.img} />
            </GridTile>
          </Link>
        ))}
      </GridList>
    </div>);
  }

};

const mapStateToProps = (state) => {
  return {
    device: state.device
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flashMessage: (text) => dispatch(showFlashMessage(text)),
    onTileClick: (path) => {
              dispatch(push(path));
            }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

