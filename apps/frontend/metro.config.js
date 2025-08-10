const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver = config.resolver || {};
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const shimsDir = path.join(__dirname, 'shims');
  if (moduleName.endsWith('/Utilities/Platform')) {
    return {
      filePath: require.resolve('react-native-web/dist/exports/Platform'),
      type: 'sourceFile',
    };
  }
  if (moduleName.endsWith('legacySendAccessibilityEvent')) {
    return {
      filePath: path.join(shimsDir, 'legacySendAccessibilityEvent.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName.endsWith('PlatformColorValueTypes')) {
    return {
      filePath: path.join(shimsDir, 'PlatformColorValueTypes.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName.endsWith('ReactNativePrivateInterface')) {
    return {
      filePath: path.join(shimsDir, 'ReactNativePrivateInterface.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
