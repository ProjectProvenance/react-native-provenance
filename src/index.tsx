import TrustBadge from './trustBadge';
import { Bundle, loadingHeight, minModalHeight } from './bundle';
import { setHost, type ApiHost } from './api';

type ConfigurationOptions = {
  apiHost: ApiHost;
};

const configure = (options: ConfigurationOptions) => {
  if (options.apiHost) {
    console.log('Setting host to:', options.apiHost);
    setHost(options.apiHost);
  }
};

// Clien could adjust container element height accordingly
const getBundleLoadingHeight = () => loadingHeight;
const getMinProofPointModalHeight = () => minModalHeight;

export {
  TrustBadge,
  Bundle,
  getBundleLoadingHeight,
  getMinProofPointModalHeight,
  configure,
};
