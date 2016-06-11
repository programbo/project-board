import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { Header, Footer, Team } from '../Project';
import { simpleSlug } from '../../utils/helpers';

const getProject = (projects, brand, name) => (
  projects.find((item) => (simpleSlug(item.brand) === brand && simpleSlug(item.name) === name))
);

const mapStateToProps = ({ projects }) => ({
  projects
});

const getProjectIndex = (projects, project) => (
  projects.indexOf(project)
);

const getPreviousProject = (projects, project) => (
  projects[(getProjectIndex(projects, project) - 1 + projects.length) % projects.length]
);

const getNextProject = (projects, project) => (
  projects[(getProjectIndex(projects, project) + 1) % projects.length]
);

const Project = ({ projects, params: { brand, name } }) => {
  const project = getProject(projects, brand, name);
  return (
    <div className="project">
      <IndexLink to="/" className="home-link hidden-xs"><span className="glyphicon glyphicon-th"/></IndexLink>
      <Header labeled project={project}/>
      <Team project={project} labeled/>
      <Link className="project-nav project-nav-previous" to={getPreviousProject(projects, project).path}><span className="glyphicon glyphicon-chevron-left"/></Link>
      <Link className="project-nav project-nav-next" to={getNextProject(projects, project).path}><span className="glyphicon glyphicon-chevron-right"/></Link>
      <Footer labeled project={project}/>
    </div>
  );
};

Project.propTypes = {
  params: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Project);
