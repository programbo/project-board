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
