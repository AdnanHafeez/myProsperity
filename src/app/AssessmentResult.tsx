
declare var gsap: any
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import {D3LinearaGauge} from './D3LinearaGauge';
import { connect } from 'react-redux';
import * as ReactTransitionGroup from 'react-addons-transition-group';


var styles = {
  container: {
    padding: 10
  }
};
interface Props {
  [propName: string]: any;
}
interface State {
  [propName: string]: any;
}
class AssessmentText extends React.Component<Props, State> {
  componentWillAppear (callback) {
    this._animateIn(callback);
  }

  componentWillEnter (callback) {
    this._animateIn(callback);
  }

  _animateIn (callback) {

        var el = this.refs['assessmentText']; //!! TODO check
    //TweenLite.set(el, {opacity: 0});
    setTimeout(function () {
    //  TweenLite.to(el, 1, {opacity: 1}).play().eventCallback('onComplete', callback);
    }, 1000);
  }

  render () {
    var {conclusion, title} = this.props;
    return (
      <div style={styles.container} ref='assessmentText'>
      <h3>{title}</h3>
        <p>{conclusion}</p>
      </div>
    );
  }
}

const AssessmentResult = (props) => {
  const {resultDetails, device} = props;
  var gaugeWidth = 300;
  if (device.size === 'medium') {
    gaugeWidth = 500;
  } else if (device.size === 'large') {
    gaugeWidth = 700;
  }
  return (<div>
        <D3LinearaGauge width={gaugeWidth} {...props} />
        <ReactTransitionGroup>
            
            <AssessmentText {...resultDetails} />
        </ReactTransitionGroup>
      </div>);
};

const mapStateToProps = (state) => {
  return {
    result: state.assessment.result,
    resultDetails: state.assessment.resultDetails,
    device: state.device,
    maxScore: 56 + 1,
    minScore: 0 - 1
  };
};
export default connect(
  mapStateToProps
)(AssessmentResult);
