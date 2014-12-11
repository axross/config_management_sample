var path   = require('path');
var fs     = require('fs');
var extend = require('extend');

// Using:
// Returns default config
// var CONFIG = require('./config')();
//
// Returns production config
// var CONFIG = require('./config')('production');
//
// Also
// var CONFIG = require('./config')(process.env.NODE_ENV);
//
// For client-side js
// var CONFIG = require('./config/bundle.json');

var cachedConfig = {
  environment: null,
  isExcludePrivate: null,
  json: null,
};

var config = function(environment, isExcludePrivate) {
  var environmentPath
  var json = require('./public.json');

  if (cachedConfig.envrionment === environment &&
      cachedConfig.isExcludePrivate === isExcludePrivate &&
      !!json) {
    return cachedConfig.json;
  }

  if (!isExcludePrivate) {
    json = extend(true, json, require('./private.json'));
  }

  fs.readdirSync(__dirname)
    .filter(function(filename) {
      if (filename === 'public.json')         return false;
      if (filename === 'private.json')        return false;
      if (filename === 'bundle.json')         return false;
      if (path.extname(filename) !== '.json') return false;

      return filename;
    })
    .forEach(function(filename) {
      var propName = path.basename(filename, '.json').toUpperCase();

      json[propName] = require(path.join(__dirname, filename));
    });

  if (environment) {
    environmentPath = path.join(__dirname, environment);

    if (fs.existsSync(path.join(environmentPath, 'public.json'))) {
      json = extend(true, json,
        require(path.join(environmentPath, 'public.json'))
      );
    }

    if (!isExcludePrivate && fs.existsSync(path.join(environmentPath, 'private.json'))) {
      json = extend(true, json,
        require(path.join(environmentPath, 'private.json'))
      );
    }

    fs.readdirSync(environmentPath)
    .filter(function(filename) {
      if (filename === 'public.json')         return false;
      if (filename === 'private.json')        return false;
      if (filename === 'bundle.json')         return false;
      if (path.extname(filename) !== '.json') return false;

      return filename;
    })
    .forEach(function(filename) {
      var propName = path.basename(filename, '.json').toUpperCase();

      json[propName] = extend(
        true,
        json[propName] ? json[propName] : [],
        require(path.join(environmentPath, filename))
      );
    });
  }

  cachedConfig.environment = environment;
  cachedConfig.isExcludePrivate = isExcludePrivate;
  cachedConfig.json = json;

  return json;
};

config.generateBundle = function(environment, callback) {
  if (typeof environment === 'function') {
    callback = environment;
    environment = null;
  }

  json = config(environment, true);

  fs.writeFile(
    path.join(__dirname, 'bundle.json'),
    JSON.stringify(json),
    callback
  );
};

module.exports = config;
