var callNextTick = require('call-next-tick');
var { Tablenest, d } = require('tablenest');
var probable = require('probable');

var tablenest = Tablenest({ probable });

var tweenLengthTableRoll = tablenest({
  root: [[1, d`d1000+1000`], [4, d`d5000+2000`], [2, d`d23000+7000`]]
});

function generate(done) {
  const seed = new Date().toISOString();
  const tweenLengthMS = tweenLengthTableRoll();
  const shouldAnimate = probable.roll(3) === 0;
  var url = `https://jimkang.com/hills/#seed=${seed}`;
  if (shouldAnimate) {
    url += `&tweenBetweenPairs=yes&tweenLengthMS=${tweenLengthMS}`;
  }

  const caption = `<a href="${url}">High-def version</a>`;

  var webimageOpts = {
    screenshotOpts: {
      clip: {
        x: 98,
        y: 16,
        width: 804,
        height: 454
      }
    },
    viewportOpts: {
      width: 1000,
      height: 563,
      deviceScaleFactor: 1
    }
  };

  if (shouldAnimate) {
    Object.assign(webimageOpts, {
      burstCount: 48,
      timeBetweenBursts: 1000 / 12,
      makeBurstsIntoAnimatedGif: true
    });
  }

  callNextTick(done, null, {
    url,
    altText: 'Hills!',
    caption,
    webimageOpts
  });
}

module.exports = {
  postingTargets: ['archive'],
  generate,
  archive: {
    name: 'Hills',
    title: 'Hills',
    idPrefix: 'hill',
    homeLink: 'https://smidgeo.com/bots/hills',
    rootPath: '/mnt/storage/archives/web-sites/smidgeo.com/bots/hills',
    footerHTML: `<footer>Want more hills? <a href="http://jimkang.com/hills">Go get you some.</a>
    <p><a href="https://smidgeo.com/bots/hills/rss/index.rss">Hills RSS</a></p>
</footer>`,
    maxEntriesPerPage: 20,
    generateRSS: true,
    fileAbstractionType: 'LocalFile',
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
