module.exports = {
  postingTargets: ['archive'],
  generateImageURL: require('../lib/state-maps/generate-state-map-image-url'),
  webimageOpts: {
    screenshotOpts: {
      clip: {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      }
    },
    viewportOpts: {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    },
    supersampleOpts: {
      desiredBufferType: 'png',
      resizeMode: 'bezier'
    }
  },
  archive: {
    name: 'A Land of Contrasts',
    title: 'A Land of Contrasts',
    idPrefix: 'fact-map-',
    homeLink: 'https://smidgeo.com/bots/land-of-contrasts',
    rootPath:
      '/mnt/storage/archives/web-sites/smidgeo.com/bots/land-of-contrasts',
    footerHTML: `<footer>
    <p><a href="https://smidgeo.com/bots/land-of-contrasts/rss/index.rss">Subscribe to RSS to get facts about America at your leisure.</a></p>
</footer>`,
    maxEntriesPerPage: 20,
    generateRSS: true,
    fileAbstractionType: 'LocalGit',
    archiveBaseURL: 'https://smidgeo.com/bots/land-of-contrasts',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/land-of-contrasts/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/land-of-contrasts/'
    }
  },
  // TODO: These should all come from a callback.
  getAltText() {
    return 'Infomap!';
  },
  getCaption() {
    return '';
  }
};
