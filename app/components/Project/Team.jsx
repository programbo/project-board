/* eslint-disable no-console, no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import { wheelProperties, createColourPalette, addMemberLabels, labelRotation } from './helpers';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.drawProjectWheel = this.drawProjectWheel.bind(this);
    this.drawPositionLabels = this.drawPositionLabels.bind(this);
    this.updateProjectWheel = this.updateProjectWheel.bind(this);
    this.updatePositionLabels = this.updatePositionLabels.bind(this);
    this.updateNameLabels = this.updateNameLabels.bind(this);
  }
  componentDidMount() {
    this.projectWheel = this.drawProjectWheel(this.teamView, this.props);
    this.positionLabels = this.drawPositionLabels(this.teamView, this.props);
    this.nameLabels = this.drawNameLabels(this.teamView, this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.updateProjectWheel(nextProps);
  }
  shouldComponentUpdate() {
    return false;
  }
  drawProjectWheel(node, { project, labeled }) {
    const { team, color, strokeWidth, pieLayout, arc } = wheelProperties(project, labeled);
    this.currentLayout = pieLayout(team);
    return d3.select(node)
      .selectAll('path')
      .data(this.currentLayout)
      .enter()
      .append('path')
      .classed('member', true)
      .attr({
        fill: (d, i) => color(i),
        'stroke-width': strokeWidth,
        d: arc
      });
  }
  drawPositionLabels(node, { project }) {
    const positionLabels = d3.select(node)
      .selectAll('g.position-label')
      .data(this.currentLayout);
    positionLabels
      .enter()
      .append('text')
      .attr('class', 'position-label')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.4em')
      .attr('transform', (d) => `rotate(${labelRotation(d)}) translate(0, -${1000 / 2.9}) rotate(-${labelRotation(d)})`)
      .style('opacity', (d) => d.value)
      .style('stroke', 'none')
      .text((d) => d.data.position);
    return positionLabels;
  }
  drawNameLabels(node, { project }) {
    const nameLabels = d3.select(node)
      .selectAll('g.name-label')
      .data(this.currentLayout);
    nameLabels
      .enter()
      .append('text')
      .attr('class', 'name-label')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('transform', (d) => `rotate(${labelRotation(d)}) translate(0, -${1000 / 2.9}) rotate(-${labelRotation(d)})`)
      .style('opacity', (d) => d.value)
      .style('stroke', 'none')
      .text((d) => d.data.name);
    return nameLabels;
  }
  updateProjectWheel({ project, labeled }) {
    const { team, color, pieLayout, arc } = wheelProperties(project, labeled);
    this.projectWheel
      .data(pieLayout(team))
      .transition()
      .duration(500)
      .attr('fill', (d, i) => color(i))
      .attrTween('d', (a, i) => {
        const interpolator = d3.interpolate(this.currentLayout[i], a);
        this.currentLayout[i] = interpolator(0);
        return (t) => arc(interpolator(t));
      });
    this.updatePositionLabels({ project, labeled });
    this.updateNameLabels({ project, labeled });
  }
  updatePositionLabels({ project, labeled }) {
    const { team, color, pieLayout, arc } = wheelProperties(project, labeled);
    this.positionLabels
      .data(pieLayout(team))
      .transition()
      .duration((d) => d.value * 500)
      .attr('transform', (d) => `rotate(${labelRotation(d)}) translate(0, -${1000 / 2.9}) rotate(-${labelRotation(d)})`)
      .style('opacity', (d) => d.value)
      .text((d) => d.data.position);
  }
  updateNameLabels({ project, labeled }) {
    const { team, color, pieLayout, arc } = wheelProperties(project, labeled);
    this.nameLabels
      .data(pieLayout(team))
      .transition()
      .duration((d) => d.value * 500)
      .attr('transform', (d) => `rotate(${labelRotation(d)}) translate(0, -${1000 / 2.9}) rotate(-${labelRotation(d)})`)
      .text((d) => d.data.name);
  }

  render() {
    return (
      <div className="team">
        <svg viewBox="0 0 1000 1000">
          <g className="team-view" ref={(ref) => (this.teamView = ref)}/>
        </svg>
      </div>
    );
  }
}

Team.defaultProps = {
  labeled: false
};

Team.propTypes = {
  children: PropTypes.any,
  project: PropTypes.object.isRequired,
  labeled: PropTypes.bool
};

export default Team;
