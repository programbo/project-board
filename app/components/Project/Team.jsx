import React, { PropTypes } from 'react';
import d3 from 'd3';
import { wheelProperties, updateLabel, labelRotation } from './helpers';

/* eslint-disable no-console */
class Team extends React.Component {
  constructor(props) {
    super(props);
    this.drawProjectWheel = this.drawProjectWheel.bind(this);
    this.updateProjectWheel = this.updateProjectWheel.bind(this);
  }
  componentDidMount() {
    this.projectWheel = this.drawProjectWheel(this.teamView, this.props);
    if (this.props.labeled) {
      this.projectLabels = this.drawProjectLabels(this.teamView, this.props);
      this.positionLabels = this.drawPositionLabels(this.teamView, this.props);
      this.nameLabels = this.drawNameLabels(this.teamView, this.props);
    }
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
  drawProjectLabels(node, { project: { label: labelData } }) {
    const verticalOffset = (d, i) => {
      const groupOffset = i <= 1 ? -0.2 : 0.2;
      return `${(i * 1.5) - 1.9 + groupOffset}em`;
    };
    const projectLabels = d3.select(node)
      .selectAll('.project-label')
      .data(labelData);
    projectLabels
      .enter()
      .append('text')
      .attr('class', (d, i) => `project-label project-label-${i}`)
      .attr('text-anchor', 'middle')
      .attr('dy', verticalOffset)
      .style('stroke', 'none')
      .text((d) => d)
      .on('click', (d, i) => {
        if (i === 1) {
          this.props.onClickName(d);
        }
      });
    d3.select(node)
      .append('line')
      .attr('class', 'project-labels-divider')
      .attr({ x1: -150, y1: 0, x2: 150, y2: 0 })
      .style('stroke', 'black')
      .style('opacity', '0.15');
    return projectLabels;
  }
  drawPositionLabels(node) {
    const positionLabels = d3.select(node)
      .selectAll('.position-label')
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
  drawNameLabels(node) {
    const { onClickName } = this.props;
    const nameLabels = d3.select(node)
      .selectAll('.name-label')
      .data(this.currentLayout);
    nameLabels
      .enter()
      .append('text')
      .attr('class', 'name-label')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('transform', (d) => `rotate(${labelRotation(d)}) translate(0, -${1000 / 2.9}) rotate(-${labelRotation(d)})`)
      .style('opacity', (d) => d.value)
      .style('cursor', 'pointer')
      .style('stroke', 'none')
      .text((d) => d.data.name)
      .on('click', (d) => {
        onClickName(d.data.name);
      });
    return nameLabels;
  }
  updateProjectWheel({ project, labeled }) {
    const { team, color, pieLayout, arc } = wheelProperties(project, labeled);
    const teamData = pieLayout(team);
    this.projectWheel
      .data(teamData)
      .transition()
      .duration(300)
      .attr('fill', (d, i) => color(i))
      .attrTween('d', (a, i) => {
        const interpolator = d3.interpolate(this.currentLayout[i], a);
        this.currentLayout[i] = interpolator(0);
        return (t) => arc(interpolator(t));
      });
    if (labeled) {
      this.updateProjectLabels(project);
      updateLabel(this.positionLabels, teamData, (d) => d.data.position);
      updateLabel(this.nameLabels, teamData, (d) => d.data.name);
    }
  }
  updateProjectLabels(project) {
    this.projectLabels
      .data(project.label)
      .transition()
      .duration(150)
      .style('opacity', (d, i) => ((i % 2) ? 0 : 1))
      .transition()
      .duration(150)
      .style('opacity', 1)
      .text((d) => d);
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
  labeled: PropTypes.bool,
  onClickName: PropTypes.func
};

export default Team;
