export const activateMainMenu = () => ({ type: 'ACTIVATE_MENU' });
export const deactivateMainMenu = () => ({ type: 'DEACTIVATE_MENU' });
export const toggleMainMenu = () => ({ type: 'TOGGLE_MENU' });

export const activateRegistration = () => ({ type: 'ACTIVATE_REGISTRATION' });
export const deactivateRegistration = () => ({ type: 'DEACTIVATE_REGISTRATION' });
export const incrementRegistration = () => ({ type: 'INCREMENT_REGISTRATION' });
export const facebookAuthRegistration = (facebookData) => ({ type: 'FACEBOOK_AUTH_REGISTRATION', facebookData });
export const facebookAuthFail = () => ({ type: 'FACEBOOK_AUTH_FAIL' });

export const activateGetInTouch = () => ({ type: 'ACTIVATE_GET_IN_TOUCH' });
export const deactivateGetInTouch = () => ({ type: 'DEACTIVATE_GET_IN_TOUCH' });

export const activateLightbox = (id) => ({ type: 'ACTIVATE_LIGHTBOX', id });
export const deactivateLightbox = () => ({ type: 'DEACTIVATE_LIGHTBOX' });

export const showSuccessMessage = () => ({ type: 'SHOW_SUCCESS_MESSAGE' });
export const hideSuccessMessage = () => ({ type: 'HIDE_SUCCESS_MESSAGE' });
export const showErrorMessage = () => ({ type: 'SHOW_ERROR_MESSAGE' });
export const hideErrorMessage = () => ({ type: 'HIDE_ERROR_MESSAGE' });
export const dataNewsLoaded = (newsData) => ({ type: 'NEWS_DATA_LOADED', newsData });
export const dataNewsFailed = (error) => ({ type: 'NEWS_DATA_FAILED', error });
