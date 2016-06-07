import d3 from 'd3';
import { compareBy, simpleSlug } from '../../utils/helpers';

export const labelRotation = ({ startAngle, endAngle }) => (180 / Math.PI) * (startAngle + ((endAngle - startAngle) / 2));

export const parseMembers = ({ members }) => {
  const project = {};
  const team = [];
  members.forEach(({ position, name }) => {
    switch (position) {
    case 'Top Kat':
      project.topKat = name;
      break;
    case 'Owner':
      project.owner = name;
      break;
    case 'Manager':
      project.manager = name;
      break;
    default:
      team.push({ position, name });
    }
  });
  team.sort(compareBy(['position']));
  return { team, ...project };
};

export const sortProjects = (unsortedProjects) => (
  unsortedProjects.sort(compareBy(['client', 'brand', 'name']))
);

export const projectPath = (project) => {
  const { brand, name } = project;
  const path = `/project/${simpleSlug(brand)}/${simpleSlug(name)}`;
  return path;
};

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

// const addLabel = (svg, className, text) => svg
//   .append('text')
//   .attr('text-anchor', 'middle')
//   .classed(className, true)
//   .text(text);

export const createColourPalette = (seed) => {
  const lightness = 0.9;
  const saturation = 0.9;
  return (i) => d3.hsl((seed - ((360 / 5) * i) % 360), lightness, saturation);
};
export const drawTeam = (teamView, team, seed, width, labeled) => {
  const color = createColourPalette(seed);
  const innerRadius = labeled ? width / 5 : 0;
  const strokeWidth = labeled ? 4 : 0;
  const pieLayout = d3.layout.pie().value(() => 1).sort(null);
  const arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(width / 2);

  /* eslint-disable no-console */
  // console.log(pieLayout(team));
  const view = teamView
    .data(pieLayout(team))
    .enter()
    .append('path');
  teamView
    .classed('member', true)
    .attr({
      fill: (d, i) => color(i),
      'stroke-width': strokeWidth,
      d: arc
    });
  console.log(3, teamView);
  view.exit().remove();
};

export const drawlabels = (selection) => {
  // const { topKat, project } = data;
  addTeamLabels(selection, 1000, 'member-position-label', ({ data: { position } }) => position).attr('dy', '-0.4em');

  addTeamLabels(selection, 1000, 'member-name-label', ({ data: { name } }) => name).attr('dy', '1em');

  // addLabel(selection, 'top-kat-label center-label', 'Top Kat:').attr({
  //   dy: '-2em'
  // });
  // addLabel(selection, 'top-kat-name center-label', topKat).attr({
  //   dy: '-0.5em'
  // });
  // addLabel(selection, 'status-label center-label', 'Status:').attr({
  //   dy: '1.5em'
  // });
  // addLabel(selection, 'status-name center-label', project.status).attr({
  //   dy: '3em'
  // });
};
