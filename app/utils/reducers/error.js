const error = (state = false, { type }) => {
  switch (type) {
  case 'SHOW_ERROR_MESSAGE':
    return true;
  case 'HIDE_ERROR_MESSAGE':
    return false;
  default:
    return state;
  }
};

export default error;
