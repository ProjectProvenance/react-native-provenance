import { offersNoProofPoints, offersSuccess } from '@src/__fixtures__/offers';
import { getOffers, configure, bundleUrl } from '@src/api';
import * as Errors from '@src/services/Errors';

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const sampleApiKey = 'test-api-key';
configure({
  apiKey: sampleApiKey,
  bundleId: 'a-bundle-id',
  apiHost: 'staging',
});

describe('getOffers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Errors, 'handle');
    jest.spyOn(Errors, 'warn');
  });

  it('calls the API', async () => {
    global.fetch = jest.fn(() => ({
      ok: true,
      json: () => Promise.resolve(offersSuccess()),
    })) as jest.Mock;

    const result = await getOffers('fakeSku');

    expectApiHasBeenCalled();
    expect(result).toEqual(offersSuccess());
  });

  describe('with server failure', () => {
    it('logs an error and returns null', async () => {
      global.fetch = jest.fn(() => ({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Bad gateway'),
      })) as jest.Mock;

      const result = await getOffers('a-sku');

      expect(result).toBeNull();
      expect(Errors.handle).toHaveBeenCalledWith(
        expect.stringContaining('Bad gateway')
      );
    });
  });

  describe('with unexpected response', () => {
    it('logs an error and returns null', async () => {
      global.fetch = jest.fn(() => ({
        ok: true,
        json: () => Promise.resolve({}),
      })) as jest.Mock;

      const result = await getOffers('a-sku');

      expect(result).toBeNull();
      expect(Errors.handle).toHaveBeenCalledWith(
        expect.stringContaining('Unexpected response')
      );
    });
  });

  describe('when proof points were not found', () => {
    it('is not shown', async () => {
      global.fetch = jest.fn(() => ({
        ok: true,
        json: () => Promise.resolve(offersNoProofPoints()),
      })) as jest.Mock;

      const result = await getOffers('fakeSku');

      expect(result).toEqual(offersNoProofPoints());
      expect(Errors.warn).toHaveBeenCalledWith(
        expect.stringContaining('No proof points found for the SKU: fakeSku')
      );
    });
  });
});

describe('getBundleUrl', () => {
  it('returns bundle URL', () => {
    expect(bundleUrl('a-sku')).toBe(
      'https://staging.provenance.org/webviews/a-bundle-id/a-sku'
    );
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
        'X-Prov-Client': expect.stringMatching(
          /^rn-\d+\.\d+.\d+\/(ios|android)\//
        ),
      },
    }
  );
}
