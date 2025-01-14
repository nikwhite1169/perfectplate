// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
module.exports = {
  resolver: {
    blacklistRE: exclusionList([/node_modules\/.*\/node_modules\/react\/.*/]),
  },
};

module.exports = getDefaultConfig(__dirname);
