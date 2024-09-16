import { act, render, screen } from '@testing-library/react-native';
import { TrustBadge, configure } from '../';
import { offersSuccess, offersNoProofPoints } from '../__fixtures__/offers';
import React from 'react';
import { View } from 'react-native';

const mockWebview = () => View;
jest.mock('react-native-webview', () => ({
  WebView: mockWebview,
}));

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const sampleApiKey = 'test-api-key';
configure({ apiHost: 'staging', key: sampleApiKey });

let resolveFetch: (data: any) => void;
let rejectFetch: (data: any) => void;
global.fetch = jest.fn(
  () =>
    new Promise((resolve, reject) => {
      resolveFetch = resolve;
      rejectFetch = reject;
    })
) as jest.Mock;

describe('TrustBadge', () => {
  function whenTrustBadgeRendered(variant?: string | undefined) {
    render(
      <View>
        <TrustBadge bundleId="fakeBundleId" sku="fakeSku" variant={variant} />
      </View>
    );
  }

  describe('fetches data from offers', () => {
    describe('when there is no response yet', () => {
      it('is not shown', async () => {
        whenTrustBadgeRendered();

        expectApiHasBeenCalled();

        expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
      });
    });

    describe('when proof points were found', () => {
      it('shows the Tick variant', async () => {
        whenTrustBadgeRendered();

        await act(() => {
          resolveFetch({
            ok: true,
            json: () => Promise.resolve(offersSuccess()),
          });
        });

        expect(screen.root).toHaveTextContent(/Sustainability claims/i);
      });
    });

    describe('when proof points were not found', () => {
      it('is not shown', async () => {
        whenTrustBadgeRendered();

        await act(() => {
          resolveFetch({
            ok: true,
            json: () => Promise.resolve(offersNoProofPoints()),
          });
        });

        expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('No proof points found for the SKU: fakeSku')
        );
      });
    });

    describe('when response is not successfull', () => {
      describe('when server failure', () => {
        it('is not shown', async () => {
          whenTrustBadgeRendered();

          await act(() => {
            rejectFetch({
              ok: false,
              text: () => Promise.resolve('Gateway error'),
            });
          });

          expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
        });
      });
    });
  });

  describe('when ProofPoint variant', () => {
    describe('when proof points found', () => {
      it('shows icons', async () => {
        whenTrustBadgeRendered('ProofPoint');

        expectApiHasBeenCalled();

        expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
        expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);

        await act(() => {
          resolveFetch({
            ok: true,
            json: () => Promise.resolve(offersSuccess()),
          });
        });

        expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
        expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
      });
    });
  });
});

function expectApiHasBeenCalled() {
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
}
