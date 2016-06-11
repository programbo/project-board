import d3 from 'd3';
import { compareBy, simpleSlug } from '../../utils/helpers';

export const projectPath = ({ brand, name }, prefix = 'project') => (
  `/${prefix}/${simpleSlug(brand)}/${simpleSlug(name)}`
);

export const normalizeProjects = (projects) => {
  let allPositions = [];
  const uniquePostions = {};
  projects.forEach(({ members }) => {
    allPositions = [...allPositions, ...members];
  });
  allPositions.forEach(({ position }) => {
    uniquePostions[position] = '';
  });
  return projects.map((project) => {
    const projectPostions = {};
    project.members.forEach(({ position, name }) => {
      projectPostions[position] = name;
    });
    const completePositions = { ...uniquePostions, ...projectPostions };
    const members = Object.keys(completePositions).map((position) => ({
      position, name: completePositions[position]
    }));

    return { ...project, members, path: projectPath(project) };
  });
};

export const labelRotation = ({ startAngle, endAngle }) => (180 / Math.PI) * (startAngle + ((endAngle - startAngle) / 2));

export const parseMembers = (projects) => (
  projects.map((project) => {
    const team = [];
    const members = {};
    project.members.forEach(({ position, name }) => {
      switch (position) {
      case 'Top Kat':
        members.topKat = name;
        break;
      case 'Owner':
        members.owner = name;
        break;
      case 'Manager':
        members.manager = name;
        break;
      default:
        team.push({ position, name });
      }
    });
    team.sort(compareBy(['position']));
    return { team, ...members, ...project };
  })
);

export const sortProjects = (unsortedProjects) => (
  unsortedProjects.sort(compareBy(['client', 'brand', 'name']))
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

// const addLabel = (svg, className, text) => svg
//   .append('text')
//   .attr('text-anchor', 'middle')
//   .classed(className, true)
//   .text(text);
/* eslint-disable no-console */

export const createColourPalette = (seed, team) => {
  const lightness = 0.9;
  const saturation = 0.9;
  let counter = 0;
  const steps = team.reduce((previous, { name }) => {
    if (!!name) {
      return previous + 1;
    }
    return previous;
  }, 0);
  const colours = team.reduce((previous, { name }) => {
    const colour = d3.hsl((seed - ((360 / steps) * counter) % 360), lightness, saturation);
    if (!!name) {
      counter += 1;
    }
    previous.push(colour);
    return previous;
  }, []);
  return (i) => colours[i];
};

// export const drawTeam = (teamView, team, seed, width, labeled) => {
//   const color = createColourPalette(seed);
//   const innerRadius = labeled ? width / 5 : 0;
//   const strokeWidth = labeled ? 4 : 0;
//   const pieLayout = d3.layout.pie().value(() => 1).sort(null);
//   const arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(width / 2);
//   const view = teamView
//     .data(pieLayout(team))
//     .enter()
//     .append('path');
//   teamView
//     .classed('member', true)
//     .attr({
//       fill: (d, i) => color(i),
//       'stroke-width': strokeWidth,
//       d: arc
//     });
//   view.exit().remove();
// };

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
