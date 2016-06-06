import React, { PropTypes } from 'react';
import { parseMembers } from './helpers';

const Header = ({ project }) => {
  const { brand, name, owner, manager } = { ...project, ...parseMembers(project) };
  return (
    <header className="project-header">
      <h3>{brand}</h3>
      <h1>{name}</h1>
      <h5><strong>Owner:</strong> {owner}</h5>
      <h5><strong>Manager:</strong> {manager}</h5>
    </header>
  );
};

Header.propTypes = {
  project: PropTypes.object.isRequired
};

export default Header;
