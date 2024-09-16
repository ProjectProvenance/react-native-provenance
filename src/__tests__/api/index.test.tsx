import { offersSuccess } from '../../__fixtures__/offers';
import { getOffers, configure } from '../../api';

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const sampleApiKey = 'test-api-key';
configure({ apiHost: 'staging', key: sampleApiKey });

describe('getOffers', () => {
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
      expect(console.error).toHaveBeenCalledWith(
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
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Unexpected response')
      );
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
