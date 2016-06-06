const facebook = (state = {}, { type, facebookData }) => {
  switch (type) {
  case 'FACEBOOK_AUTH_REGISTRATION':
    return facebookData;
  case 'FACEBOOK_AUTH_FAIL':
    return { status: 'failed' };
  default:
    return state;
  }
};

export default facebook;
