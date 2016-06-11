import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import getPageData, { defaultPageData } from '../../data/data';
import { SiteHeader, SiteContent, SiteFooter } from '.';
import { updateMetadata } from '../../utils/helpers';
import { setProjects } from '../../utils/actions';

import { projects } from '../../data/projects';
import { parseMembers, sortProjects, normalizeProjects } from '../Project/helpers';

const mapStateToProps = ({ routing }) => ({
  routing
});

class Main extends React.Component {
  componentWillMount() {
    const { dispatch, routing: { locationBeforeTransitions: { pathname } } } = this.props;

    this.pageData = getPageData(pathname) || defaultPageData;
    updateMetadata(this.pageData);
    dispatch(setProjects(sortProjects(parseMembers(normalizeProjects(projects)))));
  }
  render() {
    return (
      <div className="main">
        <SiteHeader/>
        <SiteContent pageData={this.pageData}>{this.props.children}</SiteContent>
        <SiteFooter/>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  routing: PropTypes.object
};

export default connect(mapStateToProps)(Main);
