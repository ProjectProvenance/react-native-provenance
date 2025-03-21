import { act, render, screen } from '@testing-library/react-native';
import { TrustBadge, configure } from '../';
import { offersSuccess, offersNoProofPoints } from '../__fixtures__/offers';
import React from 'react';
import { View } from 'react-native';
import * as api from '../api';

const mockWebview = () => View;
jest.mock('react-native-webview', () => ({
  WebView: mockWebview,
}));

const mockGetOffers = jest.spyOn(api, 'getOffers');

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('TrustBadge', () => {
  configure({
    apiKey: 'test-api-key',
    bundleId: 'fakeBundleId',
    apiHost: 'staging',
  });

  function whenTrustBadgeRendered(variant?: string | undefined) {
    render(
      <View>
        <TrustBadge sku="fakeSku" variant={variant} />
      </View>
    );
  }

  let getOffersPromiseResolve: (data: any) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    const getOffersPromise = new Promise<any>((resolve) => {
      getOffersPromiseResolve = resolve;
    });
    mockGetOffers.mockReturnValue(getOffersPromise);
  });

  describe('when there is no response yet', () => {
    it('is not shown', async () => {
      whenTrustBadgeRendered();

      expect(mockGetOffers).toHaveBeenCalled();

      expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
    });
  });

  describe('when proof points were found', () => {
    it('shows the Tick variant by default', async () => {
      whenTrustBadgeRendered();

      await act(() => {
        getOffersPromiseResolve(offersSuccess());
      });

      expect(screen.root).toHaveTextContent(/Sustainability claims/i);
    });

    describe('when ProofPoint variant', () => {
      it('shows icons', async () => {
        whenTrustBadgeRendered('ProofPoint');

        expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
        expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);

        await act(() => {
          getOffersPromiseResolve(offersSuccess());
        });

        expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(0);
        expect(screen.queryAllByLabelText('Claim icon')).toHaveLength(2);
      });
    });
  });

  describe('when proof points were not found', () => {
    describe('when Tick variant', () => {
      it('is still shown as success response from API without proof points indicates there are brand proof points', async () => {
        whenTrustBadgeRendered();

        await act(() => {
          getOffersPromiseResolve(offersNoProofPoints());
        });

        expect(screen.root).toHaveTextContent(/Sustainability claims/i);
      });
    });

    describe('when ProofPoint variant', () => {
      it('is still shown as success response from API without proof points indicates there are brand proof points', async () => {
        whenTrustBadgeRendered('ProofPoint');

        await act(() => {
          getOffersPromiseResolve(offersNoProofPoints());
        });

        expect(screen.queryAllByLabelText('Provenance logo')).toHaveLength(1);
      });
    });

    describe('when no offers', () => {
      it('is not shown', async () => {
        whenTrustBadgeRendered();

        await act(() => {
          getOffersPromiseResolve(null);
        });

        expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
      });
    });
  });

  describe('when error raised', () => {
    it('is not shown', () => {
      mockGetOffers.mockImplementation(() => {
        throw new Error('Unhandled error');
      });
      expect(() => whenTrustBadgeRendered()).not.toThrow();

      expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
    });
  });

  describe('with wrong params', () => {
    it('gently notifies developer', () => {
      expect(() => {
        whenTrustBadgeRendered('UnsupportedVariant');
      }).not.toThrow();

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          'Trust badge variant "UnsupportedVariant" is invalid'
        )
      );
    });
  });

  describe('if was not configured', () => {
    it('gently notifies developer', () => {
      jest.spyOn(api, 'isConfigured').mockReturnValue(false);

      expect(() => {
        whenTrustBadgeRendered();
      }).not.toThrow();

      expect(screen.root).not.toHaveTextContent(/Sustainability claims/i);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[Provenance] Configuration missing')
      );
    });
  });
});
