import React, { Component } from 'react';
import { updateAndSave, dataParse } from '../../modules/utils';
import { app_settings } from '../../modules/settings';
import { parse } from '../../modules/chart-tool';
import { timeFormat } from 'd3-time-format';

export default class ChartRanges extends Component {

  constructor(props) {
    super(props);
    this.removeRange = this.removeRange.bind(this);
    this.editRange = this.editRange.bind(this);
    this.toggleNewRange = this.toggleNewRange.bind(this);
    this.addRange = this.addRange.bind(this);
    this.setAxis = this.setAxis.bind(this);
    this.state = {
      add: true,
      availableAxes: ['x-axis', 'y-axis'],
      availableInputs: ['start', 'end'],
      axis: 'x-axis',
      start: null,
      end: null
    };
  }

  removeRange(event) {
    debugger;
    // const key = event.target.value;
    // const h = this.props.chart.annotations.highlight.filter(d => {
    //   if (d.key !== key) return d;
    // });
    // updateAndSave('charts.update.annotation.highlight', this.props.chart._id, h);
  }

  editRange(event) {

  }

  setAxis(event) {
    this.setState({ axis: event.target.value });
  }

  toggleNewRange() {
    const add = !this.state.add;
    this.setState({ add });
    if (add) {
      if (this.props.chart.options.type === 'bar') {
        this.setState({
          availableAxes: ['x-axis'],
          availableInputs: ['start'],
          axis: 'x-axis'
        });
        return;
      }

      if (['line', 'area', 'multiline', 'column'].indexOf(this.props.chart.options.type) !== -1) {
        const axes = [];
        const inputs = [];

        // deal with x axis
        // deal with y-axis

        // if (this.props.chart.x_axis.scale === 'time' || this.props.chart.x_axis.scale === 'ordinal-time') {
        //   axes.push('x-axis');
        //   inputs.push('start', 'end');
        //   return;
        // } else {
        //   // ordinal
        //
        // }
      }
    }

  }

  addRange(event) {
    event.preventDefault();
    return false;
  }

  // {
  //   axis: 'x|y',
  //   style: '',
  //   start: 'DATE',
  //   end: 'DATE' // optional
  // }

  currentRanges() {
    const chart = this.props.chart;
    if (chart.annotations && chart.annotations.range && chart.annotations.range.length) {
      return true;
    } else {
      return false;
    }
  }

  renderAddRange() {
    return (
      <form onSubmit={this.addRange} className='add-range'>
        <p>Select a start value (and, optionally, an end value) by filling in the fields below.</p>
        <h4>Range axis</h4>
        <ul className='radio-buttons'>
          {this.state.availableAxes.map(d => {
            const text = d === 'x-axis' ? 'X-axis' : 'Y-axis';
            return (
              <li key={d}>
                <input
                  type='radio'
                  id={d}
                  name='range-axis'
                  value={d}
                  className='input-radio'
                  checked={this.state.axis === d}
                  onChange={this.setAxis}
                />
                <label htmlFor='x-axis'>{text}</label>
              </li>
            );
          })}
        </ul>
        <div className='start-end'>
          {this.state.availableInputs.map(d => {
            const text = d === 'start' ? 'Start' : 'End',
              scale = this.props.chart[this.state.axis.replace('-', '_')].scale;
            let inputType;
            switch (scale) {
              case 'linear':
                inputType = 'number';
                break;
              case 'time':
              case 'ordinal-time':
                inputType = this.props.chart.hasHours ? 'datetime-local' : 'date';
                break;
            }
            return (
              <div className='start-end-unit' key={d}>
                <h4>{text}</h4>
                <input
                  type={inputType}
                  className='input-field'
                />
              </div>
            );
          })}
        </div>
        <span><button>Save</button> <button onClick={this.toggleNewRange} className='delete'>Delete</button></span>
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.state.add ? this.renderAddRange() : <button onClick={this.toggleNewRange}>Add range</button> }
        {this.currentRanges() ?
          <div className='current-anno'>
            <p>Current ranges</p>
            <ul>
              {this.props.chart.annotations.range.map((d, i) => {
                debugger;
                // const formatTime = timeFormat(this.props.chart.date_format);
                // let keyText = d.key;
                // if (this.props.chart.x_axis.scale === 'time' || this.props.chart.x_axis.scale === 'ordinal-time') {
                //   keyText = formatTime(new Date(d.key));
                // }
                return (
                  <li className='range-item' key={i}>
                    {/* from, to */}
                    <button className='range-edit' value={d.key} onClick={this.editRange}>Edit</button>
                  </li>
                );
              })}
            </ul>
          </div>
        : null }
      </div>
    );
  }
}
