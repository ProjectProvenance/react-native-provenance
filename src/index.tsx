import TrustBadge from './trustBadge';
import { Bundle, loadingHeight, minModalHeight } from './bundle';
import { setHost, setApiKey, type ApiHost } from './api';

type ConfigurationOptions = {
  apiHost?: ApiHost;
  key: string;
};

const configure = (options: ConfigurationOptions) => {
  if (options.apiHost) {
    console.log('Setting host to:', options.apiHost);
    setHost(options.apiHost);
  }

  setApiKey(options.key);
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
