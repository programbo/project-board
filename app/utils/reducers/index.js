import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import contact from './contact';
import error from './error';
import facebook from './facebook';
import getInTouch from './getInTouch';
import lightbox from './lightbox';
import mainMenu from './mainMenu';
import news from './news';
import registration from './registration';
import success from './success';


const app = combineReducers({
  contact,
  error,
  getInTouch,
  facebook,
  lightbox,
  mainMenu,
  news,
  form,
  registration,
  routing,
  success
});

export default app;
