import React, { Component } from 'react';
import ChartHighlight from './ChartHighlight';
import ChartRanges from './ChartRange';
import { updateAndSave } from '../../modules/utils';
import Swal from 'sweetalert2';


export default class ChartAnnotations extends Component {

  constructor(props) {
    super(props);
    this.toggleCollapseExpand = this.toggleCollapseExpand.bind(this);
    this.resetAnnotations = this.resetAnnotations.bind(this);
    this.state = {
      expanded: true
    };
  }

  expandStatus() {
    return this.state.expanded ? 'expanded' : 'collapsed';
  }

  toggleCollapseExpand() {
    const expanded = !this.state.expanded;
    this.setState({ expanded });
    this.props.toggleAnnotationMode(expanded);
  }

  resetAnnotations() {
    updateAndSave('charts.update.annotation.reset', this.props.chart._id);
  }

  helpHighlighting() {
    Swal({
      title: 'Highlighting?',
      text: "You can now highlight chosen bars and columns with a custom colour. Try it out by clicking on a colour, then clicking on the bar you'd like to recolour.",
      type: 'info'
    });
  }



  helpText() {

  }

  // RANGES
  // Should include a field where you can type the minimum and maximum value
  // How do I handle ordinal-time data?
  //
  // LINE OR AREA
  // column headings
  //
  // annotations = {
  //   highlight: [
  //     {
  //       key: 'Canada',
  //       color: '#HEX'
  //     }
  //   ],
  //   range: [
  //     {
  //       axis: 'x|y',
  //       style: '',
  //       start: 'DATE',
  //       end: 'DATE' // optional
  //     }
  //   ],
  //   text: [
  //     {
  //       type: 'point',
  //       x: '12%',
  //       y: '14%',
  //       alignment: 'tl'
  //     },
  //     {
  //       type: 'area',
  //       x1: '12%',
  //       y1: 'derp',
  //       x2: 'derp',
  //       y2: 'derp',
  //       alignment: 'tl'
  //     }
  //   ]
  // };

  render() {
    return (
      <div className='edit-box'>
        <h3 onClick={this.toggleCollapseExpand}>Annotations</h3>
        <div className={`unit-edit ${this.expandStatus()}`}>

          {this.props.annotationMode ?
            <p className='note'>Note: While the Annotation tab is open, previewed chart tips will be disabled.</p> : null
          }

          <div className='unit-edit anno-highlight-edit'>
            <h4>Highlighting <a onClick={this.helpHighlighting} className='help-toggle help-anno-higlight'>?</a></h4>
            <ChartHighlight {...this.props} />
          </div>

          <div className='unit-edit anno-range-edit'>
            <h4>Ranges <a onClick={this.helpRanges} className='help-toggle help-anno-ranges'>?</a></h4>
            <ChartRanges {...this.props} />
          </div>

          <div className='unit-edit anno-text-edit' style={{ opacity: 0.2 }}>
            <h4>Text annotations (coming soon) <a onClick={this.helpText} className='help-toggle help-anno-text'>?</a></h4>
            {/* Add point|area text
            Current text elements
            Alignment */}
          </div>

          <button className='annotation-reset' onClick={this.resetAnnotations}>Reset all annotations</button>

        </div>
      </div>
    );
  }

}
