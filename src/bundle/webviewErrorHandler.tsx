import { type NativeSyntheticEvent } from 'react-native';
import * as Errors from '../services/Errors';

class ProvenanceWebviewError extends Error {
  constructor(message: string, event: any) {
    let eventDetails: string = '';
    try {
      eventDetails = JSON.stringify(event);
    } catch (e) {
      eventDetails =
        'Could not stringify event, please inspect cause on the error';
    }
    super([message, eventDetails].join(': '), { cause: event });
  }
}

export function webviewErrorHandler(errorEventName: string) {
  return (syntheticEvent: NativeSyntheticEvent<any>) => {
    const { nativeEvent } = syntheticEvent;
    Errors.handle(new ProvenanceWebviewError(errorEventName, nativeEvent));
  };
}
