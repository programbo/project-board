/* eslint-disable no-console, no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import { createColourPalette } from './helpers';

let currentLayout;
const wheelProperties = ({ colourSeed, team }, labeled) => (
  {
    team: team.map((member) => ({ ...member, included: member.name ? 1 : 0 })),
    color: createColourPalette(colourSeed, team),
    strokeWidth: labeled ? 4 : 0,
    pieLayout: d3.layout.pie().value((d) => d.included).sort(null),
    arc: d3.svg.arc().innerRadius(labeled ? (1000 / 5) : 0).outerRadius(1000 / 2)
  }
);

const drawProjectWheel = (node, { project, labeled }) => {
  const { team, color, strokeWidth, pieLayout, arc } = wheelProperties(project, labeled);
  currentLayout = pieLayout(team);
  return d3.select(node)
    .selectAll('path')
    .data(currentLayout)
    .enter()
    .append('path')
    .classed('member', true)
    .attr({
      fill: (d, i) => color(i),
      'stroke-width': strokeWidth,
      d: arc
    });
};

const redrawProjectWheel = (projectWheel, { project, labeled }) => {
  const { team, color, pieLayout, arc } = wheelProperties(project, labeled);
  const arcTween = (a, i) => {
    const interpolator = d3.interpolate(currentLayout[i], a);
    currentLayout[i] = interpolator(0);
    return (t) => arc(interpolator(t));
  };
  const wheel = projectWheel
    .data(pieLayout(team))
    .attr('fill', (d, i) => color(i));
  wheel
    .transition()
    .duration(300)
    .attrTween('d', arcTween);
};

class Team extends React.Component {
  componentDidMount() {
    this.projectWheel = drawProjectWheel(this.teamView, this.props);
  }
  componentWillReceiveProps(nextProps) {
    redrawProjectWheel(this.projectWheel, nextProps);
  }
  shouldComponentUpdate() {
    return false;
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
