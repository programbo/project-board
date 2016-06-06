import React from 'react';
import { Link } from 'react-router';
import { Team } from '../Project';
import { projects } from '../../data/projects';
import { projectPath, sortProjects } from '../Project/helpers';

const sortedProjects = sortProjects(projects);

const projectLink = (project, index) => (
  <Link className="project-link col-xs-6 col-sm-4 col-md-3" to={projectPath(project)} key={index}>
    <div className="project-label">
      <div className="project-client hidden-xs">{project.client}</div>
      <div className="project-brand">{project.brand}</div>
      <div className="project-name">{project.name}</div>
    </div>
    <Team project={project} key={index}/>
  </Link>
);

const Home = () => (
  <div className="home">
    <h1>Meerkats Projects</h1>
    <div className="projects row">
      {sortedProjects.map((project, index) => projectLink(project, index)
      )}
    </div>
  </div>
);

export default Home;
