import React from 'react';
import Main from '../components/Layout/Main';
import { Home, Project, NotFound } from '../components/Pages';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route component={Main} path="/">
    <IndexRoute component={Home} name="Home"/>
    <Route component={Project} name="Project" path="project/:brand/:name"/>
    <Route component={NotFound} name="NotFound" path="*"/>
  </Route>
);
