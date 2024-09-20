import { Platform } from 'react-native';
import * as Errors from '../services/Errors';
import { type OnErrorCallback } from '../services/Errors';
import { version } from '../../package.json';

const hosts = {
  production: 'https://provenance.org',
  staging: 'https://staging.provenance.org',
};
const path = '/webviews';

let host = hosts.production;
let apiRoot = 'https://api.provenance.org';
let apiKey: string = '';
let bundleId: string | undefined;

function getClientInfo() {
  return [`rn-${version}`, Platform.OS, Platform.Version].join('/');
}

export function getClientHeaders() {
  return {
    'X-Prov-Client': getClientInfo(),
  };
}

type ApiHost = 'staging' | 'production' | string;

type ConfigurationOptions = {
  key: string;
  bundleId: string;
  apiHost?: ApiHost;
  onError?: OnErrorCallback;
};

export const configure = (options: ConfigurationOptions) => {
  try {
    setApiKey(options.key);
    setBundleId(options.bundleId);

    if (options.apiHost) {
      console.log('Setting host to:', options.apiHost);
      setHost(options.apiHost);
    }

    if (options.onError) {
      Errors.setOnErrorCallback(options.onError);
    }
  } catch (e) {
    Errors.handle(e as Error);
  }
};

export function isConfigured() {
  return apiKey && apiKey !== '';
}

function setHost(apiHost: ApiHost) {
  if (apiHost === 'staging' || apiHost === 'production') {
    host = hosts[apiHost];
  } else {
    host = apiHost;
  }

  if (apiHost === 'staging') {
    apiRoot = 'https://api-staging.provenance.org';
  }
}

class ProvenanceConfigError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function setApiKey(key: string) {
  if (!key?.trim())
    throw new ProvenanceConfigError(
      '"key" is missing. Please provide API key.'
    );

  apiKey = key;
}

function setBundleId(bundleIdValue: string) {
  if (!bundleIdValue?.trim())
    throw new ProvenanceConfigError(
      '"bundleId" is missing. Please provide valid Bundle Id'
    );

  bundleId = bundleIdValue;
}

export function bundleUrl(sku: string) {
  return host + path + `/${bundleId}/${sku}`;
}

export type OffersData = {
  proofPoints: ProofPoint[];
};

export type ProofPoint = {
  iconHTML: string;
};

export async function getOffers(sku: string): Promise<OffersData | null> {
  try {
    const response = await fetch(apiRoot + `/v1/offers/${sku}?type=sku`, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
        ...getClientHeaders(),
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (!data.proofPoints) {
        Errors.handle(
          'Unexpected response. Looks like API endpoint having a problem please let us know if the issue persists.'
        );
        return null;
      }
      if (data.proofPoints.length === 0) {
        Errors.warn(
          `No proof points found for the SKU: ${sku}, it could be a valid case but better double check that the SKU is valid.`
        );
      }
      return data;
    } else {
      const message = await response.text();
      Errors.handle(`Response failed. ${response.status} ${message}`);
      return null;
    }
  } catch (e) {
    Errors.handle(e as Error);
    return null;
  }
}
