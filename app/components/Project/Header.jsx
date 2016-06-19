import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { setSearchTerm } from '../../utils/actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch, { project: { brand } }) => ({
  onClickClient: () => {
    dispatch(setSearchTerm(brand));
    dispatch(push('/'));
  }
});

const Header = ({ onClickClient, project: { brand, name, owner, manager } }) => (
  <header className="project-header">
    <h3 className="header-brand" onClick={onClickClient}>{brand}</h3>
    <h1 className="header-name">{name}</h1>
    <h5 className="header-owner"><strong>Owner:</strong> {owner}</h5>
    <h5 className="header-manager"><strong>Manager:</strong> {manager}</h5>
  </header>
);

Header.propTypes = {
  project: PropTypes.object.isRequired,
  onClickClient: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
