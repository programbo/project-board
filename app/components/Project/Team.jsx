/* eslint-disable no-console, no-unused-vars */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import { createColourPalette } from './helpers';

let current;
const wheelProperties = ({ colourSeed, team }, labeled) => (
  {
    team: team.map((member) => ({ ...member, included: member.name ? 1 : 0 })),
    color: createColourPalette(colourSeed),
    strokeWidth: labeled ? 4 : 0,
    pieLayout: d3.layout.pie().value((d) => d.included).sort(null),
    arc: d3.svg.arc().innerRadius(labeled ? 200 : 0).outerRadius(1000 / 2)
  }
);

const drawProjectWheel = (node, { project, labeled }) => {
  const { team, color, strokeWidth, pieLayout, arc } = wheelProperties(project, labeled);
  return d3.select(node)
    .selectAll('path')
    .data(pieLayout(team))
    .enter()
    .append('path')
    .classed('member', true)
    .attr({
      fill: (d, i) => color(i),
      'stroke-width': strokeWidth,
      d: arc
    })
    .each((d) => {
      current = d;
    });
};

const redrawProjectWheel = (projectWheel, { project, labeled }) => {
  const { team, pieLayout, arc } = wheelProperties(project, labeled);
  const arcTween = (a) => {
    const i = d3.interpolate(current, a);
    current = i(0);
    return function y(t) {
      return arc(i(t));
    };
  };
  const wheel = projectWheel.data(pieLayout(team));
  wheel.transition().duration(300).attrTween('d', arcTween);
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
