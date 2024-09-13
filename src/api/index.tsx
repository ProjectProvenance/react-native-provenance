const hosts = {
  production: 'https://provenance.org',
  staging: 'https://staging.provenance.org',
};
const path = '/webviews';

let host = hosts.production;
let apiRoot = 'https://api.provenance.org';
let apiKey: string = '';

export type ApiHost = 'staging' | 'production' | string;

export function setHost(apiHost: ApiHost) {
  if (apiHost === 'staging' || apiHost === 'production') {
    host = hosts[apiHost];
  } else {
    host = apiHost;
  }

  if (apiHost === 'staging') {
    apiRoot = 'https://api-staging.provenance.org';
  }
}

export function setApiKey(key: string) {
  apiKey = key;
}

export function bundleUrl(bundleId: string, sku: string) {
  return host + path + `/${bundleId}/${sku}`;
}

export type OffersData = {
  proofPoints: ProofPoint[];
};

export type ProofPoint = {
  iconHTML: string;
};

export function getOffers(sku: string): Promise<OffersData> {
  return fetch(apiRoot + `/v1/offers/${sku}?type=sku`, {
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
    },
  })
    .then((response) => response.json())
    .catch(console.error);
}
