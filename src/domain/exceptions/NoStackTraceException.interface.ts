export abstract class NoStackTraceException extends Error {
  protected constructor(message: string) {
    super(message);
    Object.defineProperty(this, 'stack', {
      get: () => undefined,
    });
  }
}
