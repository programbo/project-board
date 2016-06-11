import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import activeProject from './activeProject';
import projects from './projects';

export default combineReducers({
  form,
  activeProject,
  projects,
  routing
});
