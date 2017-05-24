import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {GridList, GridTile} from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {showFlashMessage , sendErrorMessage} from './actions';
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
}

interface MyState {
 
}

export default class DirectorsGoals extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle("DHA Director's Goals");
  }

  render () {


    return (
    <div style={styles.container as any}>
      <h1>DHA Director's Goals</h1>
      <ul>
        <li>Fortify our Relationship with the Services</li>
        <li>Strengthen our role as a Combat Support Agency</li>
        <li>Optimize DHA Operations</li>
      </ul>

      <h3>Vision</h3>
      <p>
      A joint, integrated, premier system of health, supporting those who
      serve in the defense of our country.
      </p>
      <h3>Mission</h3>
      <p>
      The Defense Health Agency (DHA) is a Combat Support Agency supporting
      the Military Services. The DHA supports the delivery of integrated,
      affordable, and high quality health services to beneficiaries of
      the Military Health System (MHS), and executes responsibility for
      shared services, functions, and activities of the MHS and other common
      clinical and business processes in support of the Military Services.
      The DHA serves as the program manager for the TRICARE health plan,
      medical resources, and the market manager for the National Capital
      Region (NCR) enhanced Multi-Service Market. The DHA manages the
      execution of policy as issued by the Assistant Secretary of Defense for
      Health Affairs and exercises authority, direction, and control over the
      inpatient facilities and their subordinate clinics assigned to the DHA in the NCR Directorate.
      </p>
    </div>
     
    );
  }

};


