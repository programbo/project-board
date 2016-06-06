const getInTouch = (state = false, action) => {
  switch (action.type) {
  case 'ACTIVATE_GET_IN_TOUCH':
    return true;
  case 'DEACTIVATE_GET_IN_TOUCH':
    return false;
  default:
    return state;
  }
};

export default getInTouch;
