import TrustBadge from './trustBadge';
import { Bundle } from './bundle';
import { setHost, type ApiHost } from './api';
import { Pic } from './Pic';

type ConfigurationOptions = {
  apiHost: ApiHost;
};

const configure = (options: ConfigurationOptions) => {
  if (options.apiHost) {
    console.log('Setting host to:', options.apiHost);
    setHost(options.apiHost);
  }
};

export { TrustBadge, Bundle, configure, Pic };
