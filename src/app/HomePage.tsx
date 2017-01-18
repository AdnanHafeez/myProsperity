import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {showFlashMessage } from './actions';
import { push } from 'react-router-redux';

const styles = {
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  },
  gridTile: {

  },
  container: {
    display: 'block'
  }
};


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
    this.props.appBarTitle && this.props.appBarTitle('S.M.A.R.T. Goals');
  }

  render () {
    var {flashMessage, appBarTitle, onTileClick, device} = this.props;


    return (
    <div style={styles.container as any}>
      <div>
      <h1>This is my workbook</h1>
              <h4>These are my choices</h4>
      <p>
      <b>Be Specific</b> – Exactly what do you want to achieve? Create sub-goals to your overall goal and address who, what, when, where and why. Use action verbs within your goals (i.e., Create, Design, Develop, Implement, etc.).</p>
      <p><b>Make It Measureable</b> – Ensure you can track the progress and measure the outcome.</p>
      <p><b>Achievable</b> – Your goals should be within your control where you can attain them. Vague (“Boiling the Ocean”) and unattainable goals may lead to disappointment.</p>
      <p><b>Realistic</b> – Make sure what you are trying to achieve is practical and relevant. Review and update your goals as needed.</p>
      <p><b>Timeline</b> – A goal should be grounded within a time frame. If you want to lose 10 pounds, by when do you want to achieve this goal?
      </p>
      </div>
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

