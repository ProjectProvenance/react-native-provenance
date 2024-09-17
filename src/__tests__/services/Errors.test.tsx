import { configure } from '@src/api';
import * as Errors from '@src/services/Errors';

global.console = {
  ...console,
  error: jest.fn(),
};

const anError = new Error('Whoa!');

describe('Errors', () => {
  describe('handle', () => {
    it('writes to errors log', () => {
      Errors.handle(anError);

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[Provenance] Error: Whoa!')
      );
    });
  });

  describe('when onError callback configured', () => {
    it('passes the error to the callback', () => {
      const onError = jest.fn();
      configure({ onError, key: 'a-key' });
      Errors.handle(anError);

      expect(onError).toHaveBeenCalledWith(anError);
    });
  });
});
