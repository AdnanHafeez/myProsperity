import * as React from 'react';
import * as ReactDOM from 'react-dom';

import d3Chart from './lib/d3t2/LinearGauge';

/*
var Gauge = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object,
    width: React.PropTypes.string
  },

  componentDidMount: function () {
    var el = this.refs.assessmentGauge;
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  },

  componentDidUpdate: function () {
    var el = this.refs.assessmentGauge;
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function () {
    return {
      data: this.props.result,
      domain: {x: [this.props.minScore, this.props.maxScore], y: [0, 100]},
      width: this.props.width || 500
    };
  },

  componentWillUnmount: function () {
    var el = this.refs.assessmentGauge;
    d3Chart.destroy(el);
  },

  render: function () {
    const {width} = this.props;
    return (
      <div style={{width: width, margin: 'auto auto auto auto'}} ref="assessmentGauge">
        <svg />
      </div>
    );
  }
});
*/
interface MyProps {
  width: any,
  result: any,
  minScore: number,
  maxScore: number
}
interface MyState {
  width: any,
  result: any,
  minScore: number,
  maxScore: number
}

export class D3LinearaGauge extends React.Component<MyProps, MyState> {
  componentDidMount () {
    var el = this.refs['assessmentGauge'];
    console.log(d3Chart);
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  }

  componentDidUpdate () {
    var el = this.refs['assessmentGauge'];
    d3Chart.update(el, this.getChartState());
  }

  getChartState () {
    return {
      data: this.props.result,
      domain: {x: [this.props.minScore, this.props.maxScore], y: [0, 100]},
      width: this.props.width || 500
    };
  }

  componentWillUnmount () {
    var el = this.refs['assessmentGauge'];
    d3Chart.destroy(el);
  }

  render () {
    const {width} = this.props;
    return (
      <div style={{width: width, margin: 'auto auto auto auto'}} ref="assessmentGauge">
        <svg />
      </div>
    );
  }
}

