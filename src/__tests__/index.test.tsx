import { act, render, screen } from '@testing-library/react-native';
import { TrustBadge, configure } from '../';
import { offersSuccess } from '../__fixtures__/offers';
import React from 'react';

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return {
    WebView: View,
  };
});
const sampleApiKey = 'test-api-key';
configure({ apiHost: 'staging', key: sampleApiKey });

let resolveFetch: (data: any) => void;
global.fetch = jest.fn(
  () =>
    new Promise((resolve) => {
      resolveFetch = resolve;
    })
) as jest.Mock;

describe('TrustBadge', () => {
  describe('fetches data from offers', () => {
    describe('when response is successfull', () => {
      it('is shown', () => {
        render(<TrustBadge bundleId="fakeBundleId" sku="fakeSku" />);
        expect(screen.root).toHaveTextContent(/Sustainability claims/i);
      });
    });

    it.todo('when response is not successfull');
  });

  describe('when ProofPoint variant', () => {
    it('shows provenance logo while loading, then the icons', async () => {
      render(
        <TrustBadge
          bundleId="fakeBundleId"
          sku="fakeSku"
          variant="ProofPoint"
        />
      );

      expect(fetch).toHaveBeenCalledWith(
        'https://api-staging.provenance.org/v1/offers/fakeSku?type=sku',
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-Api-Key': sampleApiKey,
          },
        }
      );
      expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(1);
      expect(screen.root).toHaveTextContent(/Sustainability claims/i);

      await act(() => {
        resolveFetch({
          json: () => Promise.resolve(offersSuccess()),
        });
      });

      expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
      expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
    });
  });
});
