import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { Header, Footer, Team } from '../Project';
import { projects } from '../../data/projects';
import { projectPath, simpleSlug, sortProjects } from '../../utils/helpers';

const sortedProjects = sortProjects(projects);

const getProject = (brand, name) => (
  projects.find((item) => (simpleSlug(item.brand) === brand && simpleSlug(item.name) === name))
);

const getProjectIndex = (project) => (
  sortedProjects.indexOf(project)
);

const getPreviousProject = (project) => (
  sortedProjects[(getProjectIndex(project) - 1 + projects.length) % projects.length]
);

const getNextProject = (project) => (
  sortedProjects[(getProjectIndex(project) + 1) % projects.length]
);

const Project = ({ routeParams: { brand, name } }) => {
  const project = getProject(brand, name);
  return (
    <div className="project">
      <IndexLink to="/" className="home-link hidden-xs"><span className="glyphicon glyphicon-th"/></IndexLink>
      <Header labeled project={project}/>
      <Team labeled project={project}/>
      <Link className="project-link project-link-previous" to={projectPath(getPreviousProject(project))}><span className="glyphicon glyphicon-chevron-left"/></Link>
      <Link className="project-link project-link-next" to={projectPath(getNextProject(project))}><span className="glyphicon glyphicon-chevron-right"/></Link>
      <Footer labeled project={project}/>
    </div>
  );
};

getProject.propTypes = {
  name: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired
};

Project.propTypes = {
  routeParams: PropTypes.object.isRequired
};

export default Project;
