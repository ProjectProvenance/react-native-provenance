import { configure } from '@provenance/react-native-provenance';

if (process.env.EXPO_PUBLIC_API_KEY && process.env.EXPO_PUBLIC_BUNDLE_ID) {
  configure({
    apiHost: process.env.EXPO_PUBLIC_API_HOST,
    key: process.env.EXPO_PUBLIC_API_KEY,
    bundleId: process.env.EXPO_PUBLIC_BUNDLE_ID,
  });
} else {
  throw 'Please set EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_BUNDLE_ID in your .env file';
}

type Examples = { [key: string]: { sku: string } };
const examples: Examples = process.env.EXPO_PUBLIC_EXAMPLES
  ? parseBundlesEnv(process.env.EXPO_PUBLIC_EXAMPLES)
  : { capsules: { sku: 'GAR001' } };
const defaultExample: string = Object.keys(examples)[0] || 'capsules';

function parseBundlesEnv(value: string): Examples {
  const result: Examples = {};
  value
    .split(';')
    .map((bundleConfig: string) => bundleConfig.trim().split(' '))
    .forEach(([key, sku]) => {
      if (!(key && sku))
        throw 'Invalid EXPO_PUBLIC_EXAMPLES format. Expected: `key sku; key2 sku2`';

      result[key] = { sku };
    });

  return result;
}

export { examples, defaultExample };
