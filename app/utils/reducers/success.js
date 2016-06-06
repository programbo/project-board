const success = (state = false, { type }) => {
  switch (type) {
  case 'SHOW_SUCCESS_MESSAGE':
    return true;
  case 'HIDE_SUCCESS_MESSAGE':
    return false;
  default:
    return state;
  }
};

export default success;
