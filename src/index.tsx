import TrustBadge from './trustBadge';
import { Bundle, loadingHeight, minModalHeight } from './bundle';
import { configure } from './api';

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
