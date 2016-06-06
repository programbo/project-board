const mainMenu = (state = false, action) => {
  switch (action.type) {
  case 'ACTIVATE_MENU':
    return true;
  case 'DEACTIVATE_MENU':
    return false;
  case 'TOGGLE_MENU':
    return !state;
  default:
    return state;
  }
};

export default mainMenu;
