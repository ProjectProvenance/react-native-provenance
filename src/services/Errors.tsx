let onError: OnErrorCallback | undefined;

const tag = '[Provenance] ';

const handle = (error: Error | string) => {
  // @TODO: Maybe notify us about this
  console.error(tag + error);
  if (onError) {
    try {
      onError(error);
    } catch (e) {
      console.error(
        `Error happened in the custom onError callback you provided ${e}. Please fix it`
      );
    }
  }
};

const warn = (message: string) => {
  console.warn(tag + message);
};

const info = (message: string) => {
  console.log(tag + message);
};

const debug = (message: string) => {
  console.debug(tag + message);
};

export type OnErrorCallback = (error: Error | string) => void;
const setOnErrorCallback = (callback: OnErrorCallback) => {
  onError = callback;
};

export { handle, warn, debug, info, setOnErrorCallback };
