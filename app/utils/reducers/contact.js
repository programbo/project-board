const contact = (state = false, { type }) => {
  switch (type) {
  case 'SHOW_SUCCESS_MESSAGE':
    return true;
  default:
    return state;
  }
};

export default contact;
