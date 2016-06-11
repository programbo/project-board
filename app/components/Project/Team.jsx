/* eslint-disable no-console, no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import { wheelProperties, createColourPalette, addMemberLabels } from './helpers';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.drawProjectWheel = this.drawProjectWheel.bind(this);
    this.drawMemberLabels = this.drawMemberLabels.bind(this);
    this.updateProjectWheel = this.updateProjectWheel.bind(this);
  }
  componentDidMount() {
    this.projectWheel = this.drawProjectWheel(this.teamView, this.props);
    this.memberLabels = this.drawMemberLabels(this.teamView, this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.updateProjectWheel(this.projectWheel, nextProps);
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
  drawMemberLabels(node, { project }) {
    const memberLabels = d3.select(node)
      .selectAll('text')
      .data(this.currentLayout.filter((d) => d.value))
      .enter();

    this.positionLabels = addMemberLabels(memberLabels, 1000, 'member-position-label', ({ data: { position } }) => position).attr('dy', '-0.4em');
    this.nameLabels = addMemberLabels(memberLabels, 1000, 'member-name-label', ({ data: { name } }) => name).attr('dy', '1em');

    return memberLabels;
  }
  updateProjectWheel(projectWheel, { project, labeled }) {
    const { team, color, pieLayout, arc } = wheelProperties(project, labeled);
    const arcTween = (a, i) => {
      const interpolator = d3.interpolate(this.currentLayout[i], a);
      this.currentLayout[i] = interpolator(0);
      return (t) => arc(interpolator(t));
    };
    const colourTween = (d, i, a) => d3.interpolate(a, d);
    const wheel = projectWheel
      .data(pieLayout(team));
    wheel
      .transition()
      .duration(500)
      .attr('fill', (d, i) => color(i))
      .attrTween('d', arcTween);
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
