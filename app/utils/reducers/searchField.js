export default (state = false, { type }) => {
  switch (type) {
  case 'SHOW_SEARCH_FIELD':
    return true;
  case 'HIDE_SEARCH_FIELD':
    return false;
  case 'TOGGLE_SEARCH_FIELD':
    return !state;
  default:
    return state;
  }
};
