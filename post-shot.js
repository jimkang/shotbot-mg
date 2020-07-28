var config = require('./config');
var kickOff = require('run-shotbot');

kickOff({
  snapperURL: 'https://smidgeo.com/snapper/snap',
  snapperKey: config.snapperKey
});
