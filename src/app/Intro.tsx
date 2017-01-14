import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

interface MyProps {
  appBarTitle(msg: string): any;
}

interface MyState {
 
}
export default class HomePage extends React.Component<MyProps, MyState> {
  constructor (props) {
    super(props);
    this.props = props;
  }

  componentWillMount () {
    this.props.appBarTitle('Intro');
  }

  render () {
    return (
      <div>
        <Card>
          <CardTitle title="Anger Module" subtitle="Resource Guide" />
          <CardText>
          Anger is one of the main concerns of service members returning from
          deployment. Problems can range from irritability to rage. Most of the
          time things calm down by themselves, but if you are finding that some
          level of anger is interfering with your successful adjustment to work
          or with your relationships, then it is something you should pay
          attention to. This program can help. Take an assessment to get feedback
          on how you are doing or jump into the workshops to learn about how to
          manage anger. Check out the videos of others who are dealing with anger
          and explore the e-library for in-depth information.
          </CardText>
          <CardActions>
            <RaisedButton containerElement={<Link to="/main/home" />} primary={true} label="Get Started!" />
          </CardActions>
        </Card>
      </div>
    );
  }
}
