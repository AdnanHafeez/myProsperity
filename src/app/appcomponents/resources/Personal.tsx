import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  },
  gridTile: {

  },
  container: {
    textAlign: 'center'
  },
  linkItem: {
    margin: '5px'
  }
};

interface Props {
  appBarTitle(msg: string): any;
}

interface State {
 
}

export default class Personal extends React.Component<Props, State> {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('Personal');
  }

  render () {
    var {appBarTitle} = this.props;


    return (
        <div style={styles.container as any}>
          <h2>Emotional Wellness: Relaxation Techniques</h2>

<div style={styles.linkItem}>
<a target="_bank" href="https://www.dartmouth.edu/~healthed/relax/downloads.html#deep">Guided Relaxation</a>
</div>

<h2>Total Fitness: Improve Your Health</h2>

<div style={styles.linkItem}>
<a target="_bank" href="https://usaphcapps.amedd.army.mil/HIOShoppingCart/viewItem.aspx?id=696">Triad: P3 Total Army Family Guide</a>
</div>

<h2>Eat Wisely</h2>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/docs/NewHandouts/Nutrition/N32_GroceryShoppingMakingAList.pdf">Grocery Shopping/Making a List</a>
</div>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/docs/NewHandouts/Nutrition/N19_MakingAMealPlanWorkInAFamily.pdf">Making a Meal Plan Work in a Family</a>
</div>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/docs/NewHandouts/Nutrition/N06_EatingWellOnABudget.pdf">Eating Well on a Budget</a>
</div>


<h2>Be Active</h2>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/download/NewHandouts/Standard/S05_IncreasingMyPhysicalActivity.pdf">How Do I Get Started With Increasing My Physical Activity?</a>
</div>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/docs/NewHandouts/PhysicalActivity/P23_ActivitiesToFitYourLifestyle.pdf">Activities to Fit Your Lifestyle</a>
</div>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/download/NewHandouts/Standard/S02_SetYourWeightLossGoals.pdf">Set Your Weight Loss Goals</a>
</div>
<div style={styles.linkItem}>
<a target="_bank" href="https://www.move.va.gov/download/NewHandouts/Standard/S07_FITT.pdf">FITT (Frequency, Intensity, Time, and Type of Activity)</a>
</div>


        </div>
    );
  }
}