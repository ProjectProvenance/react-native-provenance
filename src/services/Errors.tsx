const tag = '[Provenance] ';

const handle = (error: Error | String) => {
  // @TODO:
  // 1. If a onError callback is registered by the client app - call it
  // 2. Possibly notify us about this
  console.error(tag + error);
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

export { handle, warn, debug, info };
