export type Callback<T> = (payload: T) => void;

const subscriptions = new Map();

const subscribe = <T>(
  eventName: string,
  callback: Callback<T>,
): (() => void) => {
  if (!subscriptions.has(eventName)) {
    subscriptions.set(eventName, new Set());
  }

  const callbacks = subscriptions.get(eventName)!;

  callbacks.add(callback);

  return () => {
    callbacks.delete(callback);

    if (callbacks.size === 0) {
      subscriptions.delete(eventName);
    }
  };
};

const broadcast = <T>(eventName: string, payload?: T): void => {
  if (!subscriptions.has(eventName)) {
    return;
  }

  const callbacks = subscriptions.get(eventName)!;

  for (const callback of callbacks) {
    callback(payload);
  }
};

export const bus = {
  subscribe,
  broadcast,
};
