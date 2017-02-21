import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SecurityHome from './SecurityHome';

const clarkSignature = require('../assets/clark_sig.png');
const styles = {
  container: {
    display: 'block'
  }
};



interface MyProps {
  appBarTitle(msg: string): any;
  mode: any;
}

interface MyState {
 
}
class IntroPage extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
    this.props = props;
  }

  componentWillMount () {
    this.props.appBarTitle('Intro');
  }

  render () {
    const {mode} = this.props;
    if(mode === 0){
       return <SecurityHome />
    }
    return (
      <div>
        <Card>
          <CardTitle title="Message From the Director" subtitle="My Prosperity Plan Workbook" />
          <CardText>
          <div style={styles.container as any}>
<h2>Message from Director of Healthcare Operations</h2>
        <p>The individual and collective well being of OUR PEOPLE (Service Members, Civilians, Contract Employees) and our Families is our foundation.</p>
    <h3> –Challenge is Good – </h3>
        <p>This Prosperity Plan Workbook is a tool to help you specify goals and to develop a 
        plan to reach those goals—you decide. The objective is to maximize your potential 
        personally, professionally, spiritually, and in your relationships. We all have 
        challenges—we should and can still prosper. This Workbook also helps your leadership 
        to support and assist you in reaching your goals.</p>
        <p>This workbook includes goal sheets for the following domains: Personal, Professional, 
        Relationship, and Spiritual. Listed within each domain are suggested categories and examples 
        or each category. Use these categories or feel free to develop your own. Reviewing your 
        workbook regularly and tracking your goals is key. You are encouraged to discuss your 
        Prosperity Plan with your Family, Friends, and Leaders. This will assist you in developing, 
        pursuing, and tracking your goals in each of these domains. It is our expectation that each 
        of us will prosper.</p>

        <p>Just because you identify goals and develop a plan does not ensure success. Hard work, dedication, perseverance, support and assistance from Family, Friends, Coworkers, and Leaders can help you accomplish your goals. Changes in your life may necessitate adding, deleting, or modifying certain goals. Honesty with yourself will be your best guide in choosing and adjusting your goals wisely.</p>
        <p>Leaders may use the Prosperity Plan Workbook to assist those they are privileged to lead in developing, specifying, pursuing and achieving their goals. Our Workbook can be a teaching/coaching/mentoring tool to challenge and guide each of us to prosper personally, professionally, spiritually, and in our relationships.</p>

        <p>Accomplish our mission/Take care of each other/Take care of our Families are interrelated and inseparable.</p>
    

<h2>Director's Goals</h2>
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



    <p>
    <img src={clarkSignature} alt="Major General Clark Signature" />
    </p>
    <p>JEFFREY B. CLARK </p>
    <p>Major General,</p>
    <p>Medical Corps United States Army</p>




          </div>
          </CardText>
          <CardActions>
            <RaisedButton containerElement={<Link to="/main/home" />} primary={true} label="Get Started!" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    mode: state.mode
  }
}

export default connect(stateToProps)(IntroPage);
