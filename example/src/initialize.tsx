import { configure } from '@provenance/react-native-provenance';

if (process.env.EXPO_PUBLIC_API_HOST && process.env.EXPO_PUBLIC_API_KEY) {
  configure({
    apiHost: process.env.EXPO_PUBLIC_API_HOST,
    key: process.env.EXPO_PUBLIC_API_KEY,
  });
}

type Designs = { [key: string]: { bundleId: string; sku: string } };
const designs: Designs = process.env.EXPO_PUBLIC_BUNDLES
  ? parseBundlesEnv(process.env.EXPO_PUBLIC_BUNDLES)
  : { capsules: { bundleId: 'IV4SBE4c', sku: 'GAR001' } };
const defaultDesign: string = Object.keys(designs)[0] || 'capsules';

function parseBundlesEnv(value: string): Designs {
  const result: Designs = {};
  value
    .split(';')
    .map((bundleConfig: string) => bundleConfig.trim().split(' '))
    .forEach(([key, bundleId, sku]) => {
      if (!(key && bundleId && sku))
        throw 'Invalid EXPO_PUBLIC_BUNDLES format. Expected: `key bundleId sku; key2 bundleId2 sku2`';

      result[key] = { bundleId, sku };
    });

  return result;
}

export { designs, defaultDesign };
