const lightbox = (state = false, { type, id }) => {
  switch (type) {
  case 'ACTIVATE_LIGHTBOX':
    return id;
  case 'DEACTIVATE_LIGHTBOX':
    return false;
  default:
    return state;
  }
};

export default lightbox;
