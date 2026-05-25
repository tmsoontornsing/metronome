const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  blockList: [
    /pretty-format\/.*/,
    /jest\/.*/,
    /@jest\/.*/,
  ],
  nodeModulesPaths: [
    require('path').resolve(__dirname, 'node_modules'),
  ],
};

module.exports = config;
