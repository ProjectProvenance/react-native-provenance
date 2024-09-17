module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src', // Add the alias configuration
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensions to resolve
      },
    ],
  ],
};
