export default (state = [], { type, projects = [] }) => {
  switch (type) {
  case 'SET_PROJECTS':
    return projects;
  default:
    return state;
  }
};
