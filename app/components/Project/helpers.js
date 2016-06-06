export const labelRotation = ({ startAngle, endAngle }) => (180 / Math.PI) * (startAngle + ((endAngle - startAngle) / 2));

export const parseMembers = ({ members }) => {
  const project = { team: [] };
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
      project.team.push({ position, name });
    }
  });
  return project;
};
