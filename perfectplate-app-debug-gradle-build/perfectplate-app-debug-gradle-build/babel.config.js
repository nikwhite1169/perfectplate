module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false, // Set this to `false` to avoid errors if variables are missing
          allowUndefined: true, // Allow undefined variables during testing
        },
      ],
      'react-native-reanimated/plugin', // Must always be the last plugin
    ],
  };
};
