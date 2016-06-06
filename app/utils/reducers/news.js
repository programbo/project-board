const news = (state = {}, { type, newsData = {}, error = {} }) => {
  switch (type) {
  case 'NEWS_DATA_LOADED':
    return newsData;
  case 'NEWS_DATA_FAILED':
    return error;
  default:
    return state;
  }
};

export default news;
