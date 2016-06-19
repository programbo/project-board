import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from '../Project';
import { filteredProjects } from '../Project/helpers';
import { showSearchField, hideSearchField, setSearchTerm, clearSearchTerm } from '../../utils/actions';

const mapStateToProps = ({ projects, search, searchField }) => ({
  projects,
  search,
  searchField
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }
  onClickSearch() {
    this.props.dispatch(showSearchField());
  }
  onClickHide() {
    this.props.dispatch(hideSearchField());
    this.props.dispatch(clearSearchTerm());
  }
  updateSearch() {
    this.props.dispatch(setSearchTerm(this.searchInput.value));
  }

  render() {
    const { projects, search, searchField } = this.props;
    return (
      <div className="home">
        {!searchField && <h1>All Projects</h1>}
        {searchField && <input type="search" onChange={this.updateSearch} defaultValue={search} ref={(ref) => (this.searchInput = ref)}/>}
        {!searchField && <i onClick={this.onClickSearch} className="glyphicon glyphicon-search"/>}
        {searchField && <i onClick={this.onClickHide} className="glyphicon glyphicon-remove"/>}
        <div className="projects row">
          {filteredProjects(projects, search).map((project, index) => <Link project={project} key={index}/>)}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  projects: PropTypes.array.isRequired,
  search: PropTypes.string,
  searchField: PropTypes.bool,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Home);
