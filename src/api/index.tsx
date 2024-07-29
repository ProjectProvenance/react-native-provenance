const hosts = {
  production: 'https://provenance.org',
  staging: 'https://staging.provenance.org',
};
const path = '/webviews';

let host = hosts.production;

export type ApiHost = 'staging' | 'production' | string;

export function setHost(apiHost: ApiHost) {
  if (apiHost === 'staging' || apiHost === 'production') {
    host = hosts[apiHost];
  } else {
    host = apiHost;
  }
}

export function bundleUrl(bundleId: string, sku: string) {
  return host + path + `/${bundleId}/${sku}`;
}
