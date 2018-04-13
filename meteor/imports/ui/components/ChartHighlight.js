import React, { Component } from 'react';
import { TwitterPicker as ColorPicker } from 'react-color';
import { updateAndSave, dataParse } from '../../modules/utils';
import { app_settings } from '../../modules/settings';
import { parse } from '../../modules/chart-tool';
import { timeFormat } from 'd3-time-format';

export default class ChartHighlight extends Component {

  constructor(props) {
    super(props);
    this.removeHighlight = this.removeHighlight.bind(this);
  }

  removeHighlight(event) {
    const key = event.target.value;
    const h = this.props.chart.annotations.highlight.filter(d => {
      if (d.key !== key) return d;
    });
    updateAndSave('charts.update.annotation.highlight', this.props.chart._id, h);
  }

  displayHighlight() {
    const { data } = dataParse(this.props.chart.data);

    let needsDates;

    if (this.props.chart.options.type !== 'bar') {
      needsDates = this.props.chart.x_axis.scale === 'ordinal' ? undefined : this.props.chart.date_format;
    }

    let dataObj, error;

    try {
      dataObj = parse(data, needsDates, this.props.chart.options.indexed);
    } catch(e) {
      error = e;
    }

    if (error) return;

    if (this.props.chart.options.type === 'bar' || this.props.chart.options.type === 'column') {
      return dataObj.seriesAmount === 1;
    } else {
      return false;
    }
  }

  highlightColors() {
    if (app_settings) { return app_settings.highlightOptions; }
  }

  currentHighlights() {
    const chart = this.props.chart;
    if (chart.annotations && chart.annotations.highlight && chart.annotations.highlight.length) {
      return true;
    } else {
      return false;
    }
  }

  renderHighlight() {
    return (
      <div>
        <ColorPicker
          triangle={'hide'}
          colors={app_settings.highlightOptions}
          onChangeComplete={this.props.handleHighlightColor}
          color={this.props.currentAnnotation.highlight}
          width={'100%'}
          className={'color-picker'}
        />
        {this.currentHighlights() ?
          <div className='current-anno'>
            <p>Currently highlighted</p>
            <ul>
            {this.props.chart.annotations.highlight.map(d => {
              const formatTime = timeFormat(this.props.chart.date_format);
              let keyText = d.key;
              if (this.props.chart.x_axis.scale === 'time' || this.props.chart.x_axis.scale === 'ordinal-time') {
                keyText = formatTime(new Date(d.key));
              }
              return (
                <li className='highlight-item' key={d.key}>
                  <div className='highlight-color' style={{ backgroundColor: d.color }}>
                    <button className='highlight-remove' value={d.key} onClick={this.removeHighlight}>&times;</button>
                  </div>
                  <div className='highlight-key'>{keyText}</div>
                </li>
              );
            })}
          </ul>
          </div>
        : null }
      </div>
    );
  }

  render() {
    return this.displayHighlight() ? this.renderHighlight() : null;
  }
}
