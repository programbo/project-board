const registration = (state = 0, action) => {
  switch (action.type) {
  case 'ACTIVATE_REGISTRATION':
    return 1;
  case 'DEACTIVATE_REGISTRATION':
    return 0;
  case 'INCREMENT_REGISTRATION':
    return state + 1;
  default:
    return state;
  }
};

export default registration;
