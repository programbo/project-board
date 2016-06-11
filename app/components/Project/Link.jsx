import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Team } from '../Project';

const ProjectLink = ({ project }) => (
  <Link className="project-link col-xs-6 col-sm-4 col-md-3" to={project.path}>
    <div className="project-label">
      <div className="project-client hidden-xs">{project.client}</div>
      <div className="project-brand">{project.brand}</div>
      <div className="project-name">{project.name}</div>
    </div>
    <Team project={project}/>
  </Link>
);

ProjectLink.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectLink;
