import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface MyProps {
  appBarTitle(title: string): any;
}

interface MyState {

}

class Resources extends React.Component<MyProps, MyState>{ 
  componentDidMount () {
    this.props.appBarTitle && this.props.appBarTitle('resources');
  }
  render () {
    return (
      <div>
        <h3>LINKS</h3>
<p>
<a target="_blank" href="http://www.abct.org/therapists/docs/Anger.pdf">Anger Fact Sheet from Association for Cognitive and Behavioral Therapies</a>
<br />
Printable pamphlet with information on anger, anger problems, and treatment alternatives.
</p>
<p>
<a target="_blank" href="http://www.abct.org/information/?m=mInformation&fa=fs_ASSERTIVENESS">
Assertiveness Training Fact Sheet from Association for Cognitive and Behavioral Therapies
</a><br />
Printable pamphlet on assertiveness training and its benefits.
</p>
<p>
<a target="_blank" href="http://www.apa.org/topics/controlanger.html">
Controlling Anger Before It Controls You – provided by the American Psychological Association
</a>
<br />
Overview of anger, anger management, strategies to control anger, and recommendations regarding counseling.
</p>

<p>
<a target="_blank" href="http://www.allaboutcounseling.com/anger.htm">
All About Counseling:</a> a website created by a consortium of counselors, therapists and other mental health professionals
<br />
Offers helpful information on the root causes of anger, discusses common myths and misconceptions about anger, and offers a forum for people to share their thoughts, concerns and questions about anger.
</p>
<p>
<a target="_blank" href="http://www.mayoclinic.com/health/anger-management/MH00102">The Mayo Clinic</a>
<br />
Effective anger management techniques plus links to articles on passive aggressive behavior, dealing with stress, intermittent explosive disorder, and forgiveness.
</p>
<p>
<a target="_blank" href="http://www.athealth.com/consumer/disorders/angercontrol.html">
At Health</a>, a leading provider of mental health information and resources
</p>
<p>
Offers information on the relationships between anger, self-talk, and PTSD.
</p>
<h3>BOOKS</h3>
<p>
ACT on Life not on Anger. Eifert, Georg H., McKay, Matthew, and Forsyth, John P. Oakland, CA: New Harbinger Publications, Inc., 2006.
This book is based on the Acceptance and Commitment Therapy (ACT) approach, which focuses on techniques and exercises to help the reader reduce suffering from anger.
</p>
<p>
Get Out of Your Mind and Into Your Life: The New Acceptance and Commitment Therapy. Hayes, Steven C. Oakland, CA: New Harbinger Publications, Inc., 2005.
This book is based on the Acceptance and Commitment Therapy (ACT) approach, which focuses on techniques and exercises to help the reader overcome depression, anger, and anxiety.
</p>
<p>
The Anger Control Workbook. McKay, Matthew, and Rogers, Peter. Oakland, CA: New Harbinger Publications, Inc. 2006.
Offers new and highly effective approaches to anger control that gives readers the tools they need to manage anger in day-to-day life.
</p>
<p>
60-Second Anger Management: Quick Tips to Handle Explosive Feelings. Hirshorn, Michael. New Horizon Press, 2002.
</p>
<p>
Quick tips to handle explosive feelings and reactions in order to express anger constructively.
</p>
<p>
The Assertiveness Workbook: How to Express Your Ideas and Stand up for Yourself at Work and In Relationships. Paterson, Randy. Oakland, CA: New Harbinger, Inc., 2000.
Learn how to build self-confidence, express your ideas, say 'no' without guilt, and stand up for yourself in your day-to-day life.
</p>
      </div>
      );
  }
}

export default Resources;
