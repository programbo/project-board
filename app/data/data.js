const data = {
  '/': {
    title: 'Home',
    description: '',
    keywords: '',
    shareImage: ''
  },
  '/project': {
    title: 'Project',
    description: '',
    keywords: '',
    shareImage: ''
  }
};

const getClosestPath = (path) => {
  let matchingPath = null;
  Object.keys(data).forEach((key) => {
    if (path.startsWith(key)) {
      matchingPath = key;
    }
  });
  return matchingPath;
};

export const defaultPageData = {
  title: '404 - Page not found',
  description: 'Page not found',
  keywords: '404',
  status: 404
};

export default (path) => data[path] || data[getClosestPath(path)] || defaultPageData;
