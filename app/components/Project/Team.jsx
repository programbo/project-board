import React, { PropTypes } from 'react';
import d3 from 'd3';

import { labelRotation, parseMembers } from './helpers';

const createCanvas = (container, width, height = width) => (
  d3.select(container)
    .append('g')
    .attr({
      transform: `translate(${width / 2}, ${height / 2})`
    })
);

const addTeamLabels = (selection, width, className, text) => (
  selection
    .append('text')
    .classed(className, true)
    .text(text)
    .attr({
      'text-anchor': 'middle',
      transform: (d) => `rotate(${labelRotation(d)}) translate(0, -${width / 2.9}) rotate(-${labelRotation(d)})`
    })
);

const addLabel = (svg, className, text) => svg
  .append('text')
  .attr('text-anchor', 'middle')
  .classed(className, true)
  .text(text);

const createColourPalette = (seed) => {
  const lightness = 0.9;
  const saturation = 0.9;
  return (i) => d3.hsl((seed - ((360 / 5) * i) % 360), lightness, saturation);
};
const drawTeam = (selection, seed, width, labeled) => {
  const color = createColourPalette(seed);
  const innerRadius = labeled ? width / 5 : 0;
  const strokeWidth = labeled ? 4 : 0;
  const arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(width / 2);
  selection.append('path')
    .classed('member', true)
    .attr({
      fill: (d, i) => color(i),
      stroke: 'white',
      'stroke-width': strokeWidth,
      d: arc
    });
};
const drawlabels = (selection, width, data) => {
  const { topKat, project } = data;
  addTeamLabels(selection, 1000, 'member-position-label', ({ data: { position } }) => position).attr('dy', '-0.4em');

  addTeamLabels(selection, 1000, 'member-name-label', ({ data: { name } }) => name).attr('dy', '1em');

  addLabel(selection, 'top-kat-label center-label', 'Top Kat:').attr({
    dy: '-2em'
  });
  addLabel(selection, 'top-kat-name center-label', topKat).attr({
    dy: '-0.5em'
  });
  addLabel(selection, 'status-label center-label', 'Status:').attr({
    dy: '1.5em'
  });
  addLabel(selection, 'status-name center-label', project.status).attr({
    dy: '3em'
  });
};

const redraw = ({ project, labeled }, container) => {
  const { team, topKat } = parseMembers(project);
  const pie = d3.layout.pie().value(() => 1).sort(null);
  const svg = createCanvas(container, 1000);
  const selection = svg.selectAll('path').data(pie(team)).enter();
  drawTeam(selection, project.colourSeed, 1000, labeled);
  labeled && drawlabels(selection, 1000, { topKat, project });
};

export default class Team extends React.Component {
  componentDidMount() {
    redraw(this.props, this.container);
  }
  componentWillReceiveProps() {
    redraw(this.props, this.container);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="team">
        <svg ref={(ref) => (this.container = ref)} viewBox="0 0 1000 1000">
          <g className="team-view"/>
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
