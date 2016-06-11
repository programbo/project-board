export default (state = {}, { type, activeProject = {} }) => {
  switch (type) {
  case 'SET_ACTIVE_PROJECT':
    return activeProject;
  case 'CLEAR_ACTIVE_PROJECT':
    return {};
  default:
    return state;
  }
};
