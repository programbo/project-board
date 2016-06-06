import config from 'config';
import ellipsize from 'ellipsize';
import express from 'express';
import FeedParser from 'feedparser';
import request from 'request';
import striptags from 'striptags';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  const apiReq = request(config.get('api.newsFeed'));
  const feedParser = new FeedParser();
  const newsData = [];

  // Set up the request
  apiReq.on('error', (err) => {
    res.status(502).json({ error: 'Error requesting the rss data', err });
    // handle any request errors
  });
  apiReq.on('response', function (apiRes) { // eslint-disable-line func-names
    const stream = this;
    if (apiRes.statusCode !== 200) {
      return this.emit('error', new Error('Bad status code'));
    }
    stream.pipe(feedParser);
    return true;
  });

  // RSS Parser
  feedParser.on('error', (err) => {
    // always handle errors
    res.status(502).json({ error: 'Error parsing the rss data', err });
  });
  feedParser.on('readable', function () { // eslint-disable-line func-names
    // This is where the action is!
    const stream = this;
    let item;
    while (item = stream.read()) { // eslint-disable-line no-cond-assign
      // Only get the latest 3
      if (newsData.length < 3) {
        newsData.push({
          title: item.title,
          description: ellipsize(striptags(item.description).replace('&nbsp;', ' '), 120),
          link: item.link
        });
      }
    }
  });
  feedParser.on('end', () => res.json(newsData));
});

module.exports = router;
