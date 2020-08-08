var callNextTick = require('call-next-tick');
var { Tablenest, d } = require('tablenest');

var tablenest = Tablenest();

var tweenLengthTableRoll = tablenest({
  root: [[1, d`d1000+1000`], [4, d`d5000+2000`], [2, d`d23000+7000`]]
});

function generateImageURL(done) {
  const seed = new Date().toISOString();
  const tweenLengthMS = tweenLengthTableRoll();
  const url = `https://jimkang.com/hills/#tweenBetweenPairs=yes&tweenLengthMS=${tweenLengthMS}&seed=${seed}`;
  const caption = `<a href="${url}">High-def version</a>`;

  callNextTick(done, null, {
    url,
    altText: 'Hills!',
    caption
  });
}

module.exports = {
  postingTargets: ['archive'],
  generateImageURL,
  webimageOpts: {
    screenshotOpts: {
      clip: {
        x: 96,
        y: 25,
        width: 800,
        height: 450
      }
    },
    viewportOpts: {
      width: 1000,
      height: 563,
      deviceScaleFactor: 1
    },
    burstCount: 48,
    timeBetweenBursts: 1000 / 12,
    makeBurstsIntoAnimatedGif: true
  },
  archive: {
    name: 'Hills',
    title: 'Hills',
    idPrefix: 'hill',
    homeLink: 'https://smidgeo.com/bots/hills',
    rootPath: '/usr/share/nginx/html/smidgeo.com/bots/hills',
    footerHTML: `<footer>Want more hills? <a href="http://jimkang.com/hills">Go get you some.</a>
    <p><a href="https://smidgeo.com/bots/hills/rss/index.rss">Hills RSS</a></p>
</footer>`,
    maxEntriesPerPage: 20,
    generateRSS: true,
    fileAbstractionType: 'LocalGit',
    archiveBaseURL: 'https://smidgeo.com/bots/hills',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/hills/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/hills/'
    }
  },
  getAltText() {
    return 'A hill.';
  },
  getCaption() {
    return '';
  }
};
