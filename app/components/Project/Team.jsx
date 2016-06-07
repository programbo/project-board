import React, { PropTypes } from 'react';
import d3 from 'd3';
// import { parseMembers, drawlabels, drawTeam } from './helpers';
import { parseMembers, createColourPalette } from './helpers';

// const redrawTeam = ({ project, labeled }, node) => {
//   const { team, topKat } = parseMembers(project);
//   const teamView = d3.select(node)
//     .selectAll('.member');
//     // .data(pieLayout(team));
//     // .enter();
//
//   drawTeam(teamView, team, project.colourSeed, 1000, labeled);
//   if (labeled) {
//     drawlabels(teamView, 1000, { topKat, project });
//   }
// };
/* eslint-disable no-underscore-dangle */
// function arcTween(a, arc) {
//   const i = d3.interpolate(this._current, a);
//   this._current = i(0);
//   return (t) => arc(i(t));
// }

const wheelProperties = (project, labeled) => (
  {
    team: parseMembers(project).team,
    color: createColourPalette(project.colourSeed),
    strokeWidth: labeled ? 4 : 0,
    pieLayout: d3.layout.pie().value(() => 1).sort(null),
    arc: d3.svg.arc().innerRadius(labeled ? 200 : 0).outerRadius(1000 / 2)
  }
);

const drawProjectWheel = (node, { project, labeled }) => {
  /* eslint-disable no-console */
  const { team, color, strokeWidth, pieLayout, arc } = wheelProperties(project, labeled);
  return d3.select(node)
    .selectAll('path')
    .data(pieLayout(team))
    .enter()
    .append('path')
    // .classed('member', true)
    .attr({
      fill: (d, i) => color(i),
      'stroke-width': strokeWidth,
      d: arc
    });
};

const redrawProjectWheel = (projectWheel, { project, labeled }) => {
  /* eslint-disable no-console */
  const { team, pieLayout } = wheelProperties(project, labeled);
  console.log(pieLayout(team));
  pieLayout.value((d) => d);
  const wheel = projectWheel.data(pieLayout(team));
  console.log(wheel);
  wheel.transition().duration(500);
  // const wheel = projectWheel
  //   // .selectAll('.member')
  //   .data(pieLayout(team));
  // wheel
  //   .transition()
  //   .duration(500);
  // wheel
  //   .enter()
  //   .append('path')
  //   // .classed('member', true)
  //   .attr({
  //     fill: (d, i) => color(i),
  //     'stroke-width': strokeWidth,
  //     d: arc
  //   });
  // console.log(wheel.exit());
  // wheel
  //   .exit()
  //   .remove();
};

export default class Team extends React.Component {
  componentDidMount() {
    this.projectWheel = drawProjectWheel(this.teamView, this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.project.brand);
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
