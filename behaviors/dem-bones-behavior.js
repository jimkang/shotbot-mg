var probable = require('probable');
var callNextTick = require('call-next-tick');
var WanderGoogleNgrams = require('wander-google-ngrams');
var config = require('../configs/dem-bones-config');
var oknok = require('oknok');
var { createWordnok } = require('wordnok');

var wordnok = createWordnok({ apiKey: config.wordnik.apiKey });
var createWanderStream = WanderGoogleNgrams({
  wordnikAPIKey: config.wordnik.apiKey
});

module.exports = {
  postingTargets: ['archive'],
  generate(done) {
    const shouldAnimate = probable.roll(3) === 0;
    var seed = 'bot-' + new Date().toISOString();
    var url = 'http://jimkang.com/dem-bones/#hideControls=yes&seed=' + seed;

    if (!shouldAnimate) {
      url += '&still=yes';
    }

    if (probable.roll(4) === 0) {
      const multiplier = probable.rollDie(20) + 2;
      url += `&numberOfSetsToUse=${multiplier}`;
      url += `&minimumNumberOfBones=${multiplier * probable.rollDie(8)}`;
    }

    var webimageOpts = {
      screenshotOpts: {
        clip: {
          x: 0,
          y: 0,
          width: 640,
          height: 640
        }
      },
      viewportOpts: {
        width: 640,
        height: 640,
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

    if (probable.roll(3) === 0) {
      wordnok.getRandomWords(
        {
          customParams: {
            minCorpusCount: 1000,
            limit: 1
          }
        },
        oknok({ ok: runWanderStream, nok: postWithoutMessage })
      );
    } else {
      post();
    }

    function runWanderStream(words) {
      var word = words[0];
      var messageWords = [];

      var stream = createWanderStream({
        word,
        direction: 'forward',
        repeatLimit: 1,
        tryReducingNgramSizeAtDeadEnds: true,
        shootForASentence: true,
        maxWordCount: 8,
        forwardStages: [
          {
            name: 'start',
            needToProceed: ['noun', 'pronoun', 'noun-plural'],
            lookFor: '*_NOUN'
          },
          {
            name: 'pushedSubject',
            needToProceed: ['verb', 'verb-intransitive', 'auxiliary-verb'],
            lookFor: '*_VERB'
          },
          {
            name: 'pushedVerb',
            needToProceed: ['noun', 'pronoun', 'noun-plural', 'adjective'],
            disallowCommonBadExits: true,
            lookFor: '*_NOUN',
            posShouldBeUnambiguous: true
          },
          {
            name: 'done' // 'pushedObject'
          }
        ]
      });
      stream.on('data', saveWord);
      stream.on('end', postWithNgram);
      stream.on('error', postWithoutMessage);

      function postWithNgram() {
        post(messageWords.join(' ') + '.');
      }

      function saveWord(ngramWord) {
        messageWords.push(ngramWord);
      }
    }

    function reportError(error) {
      console.log(error);
    }

    function postWithoutMessage(error) {
      reportError(error);
      post();
    }

    function post(message) {
      var altText = 'Dem bones dem bones dem – dry bones!';
      if (message) {
        url += '&message=' + encodeURIComponent(message);
      }

      var caption = `<a href="${url}">Source</a> | ` + altText;
      callNextTick(done, null, { url, altText, caption, webimageOpts });
    }
  },
  archive: {
    name: 'Dem Bones',
    title: 'Dem Bones',
    idPrefix: 'bones-',
    homeLink: 'https://smidgeo.com/bots/dem-bones',
    rootPath: '/mnt/storage/archives/web-sites/smidgeo.com/bots/dem-bones',
    footerHTML: `<footer>
    <p>Dem bones dem bones dem &mdash; dry bones!</p>
    <p><a href="http://jimkang.com/dem-bones/">Make your own bones!</a></p>
    <p><a href="https://smidgeo.com/bots/dem-bones/rss/index.rss">Subscribe to Bone RSS!</a></p>
</footer>`,
    maxEntriesPerPage: 20,
    generateRSS: true,
    fileAbstractionType: 'LocalFile',
    archiveBaseURL: 'https://smidgeo.com/bots/dem-bones',
    rssFeedOpts: {
      feed_url: 'https://smidgeo.com/bots/dem-bones/rss/index.rss',
      site_url: 'https://smidgeo.com/bots/dem-bones/'
    }
  }
};
