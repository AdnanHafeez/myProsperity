import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
interface MyProps {
  appBarTitle(title: string): any;
}

interface MyState {
 
}
class Library extends React.Component<MyProps, MyState> {
  componentDidMount () {
    this.props.appBarTitle && this.props.appBarTitle('Anger Library');
  }
  render () {
    return (
      <div>
        <h3>1.1 INTRODUCTION</h3>
        <p>
Anger is an emotion that ranges from slight
irritation to intense rage. Uncontrolled anger
can lead to problems in daily living causing
strains on the body and on your relationships. 
</p>
        <h3>1.1.1 What is Anger?</h3>
        <p>
Anger is an emotion. People get angry when they
feel threatened, wronged, or powerless. Some
people act impulsively, aggressively, or violently
when they are angry. But you can choose to
express your anger in a healthy way.
</p>

          <h3>
            1.1.2 When Does Anger Become a Problem?
          </h3>
          <p>
            Anger creates problems in civilian life when it’s too
intense, happens too often, or leads to violent behavior.
Intense and frequent anger strains the body,
causing these health problems:
</p>
<p>
<ul>
<li>High blood pressure</li>
<li>Headaches</li>
<li>Chronic pain</li>
<li>Heart disease</li>
<li>Muscle and joint pain</li>
<li>Dental problems (from jaw clenching and teeth grinding)</li>
<li>High cholesterol</li>
<li>Weak immune system</li>
<li>Stomach and digestive system problems</li>
<li>Early death</li>
</ul>
</p>
<p>
           Aggressive behavior can also cause problems in
relationships and at work, producing feelings of
shame, guilt, and regret. Left unchecked, anger
which has turned into aggression often leads to:

</p>
<p>
<ul>
<li>Frequent arguments</li>
<li>Strained relationships and divorce</li>
<li>Injury to self or others</li>
<li>Domestic violence</li>
<li>Child and pet abuse</li>
<li>Work-related problems</li>
<li>Legal and money problems</li>
<li>Road rage and traffic tickets</li>
<li>Jail or prison time</li>
</ul>
</p>
<h3>1.2.1 Assertiveness</h3>

<p>
Assertiveness is also a type of behavior. But assertive people work through their anger without
getting aggressive. Assertive behavior says, "my feelings, thoughts, and beliefs are important.
But your feelings, thoughts, and beliefs are equally important."
</p>
<p>
Assertiveness doesn't mean ignoring your own rights and feelings - that's called passive
behavior. Assertiveness means standing up for your rights, while respecting the rights of others.
Here's how an assertive response to anger differs from an aggressive response.
</p>
<p><Link to="main/debug">Debug Test</Link></p>
  </div>
    );
  }
}
export default Library;
