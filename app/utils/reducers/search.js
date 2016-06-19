export default (state = '', { type, searchTerm = '' }) => {
  switch (type) {
  case 'SET_SEARCH_TERM':
    return searchTerm;
  case 'CLEAR_SEARCH_TERM':
    return {};
  default:
    return state;
  }
};
