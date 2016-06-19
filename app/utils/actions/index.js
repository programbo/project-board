export const setProjects = (projects) => ({ type: 'SET_PROJECTS', projects });

export const setActiveProject = (project) => ({ type: 'SET_ACTIVE_PROJECT', project });
export const clearActiveProject = () => ({ type: 'CLEAR_ACTIVE_PROJECT' });

export const setSearchTerm = (searchTerm) => ({ type: 'SET_SEARCH_TERM', searchTerm });
export const clearSearchTerm = () => ({ type: 'CLEAR_SEARCH_TERM' });
