import React, { PropTypes } from 'react';
import { parseMembers } from './helpers';

const Footer = ({ project }) => {
  const { due } = { ...project, ...parseMembers(project) };
  return (
    <footer className="project-footer">
      <h5>Due: {due}</h5>
    </footer>
  );
};

Footer.propTypes = {
  project: PropTypes.object.isRequired
};

export default Footer;
