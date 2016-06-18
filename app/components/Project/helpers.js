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

export const wheelProperties = ({ colourSeed, team }, labeled) => (
  {
    team: team.map((member) => ({ ...member, included: member.name ? 1 : 0 })),
    color: createColourPalette(colourSeed, team),
    strokeWidth: labeled ? 4 : 0,
    pieLayout: d3.layout.pie().value((d) => d.included).sort(null),
    arc: d3.svg.arc().innerRadius(labeled ? (1000 / 5) : 0).outerRadius(1000 / 2)
  }
);
