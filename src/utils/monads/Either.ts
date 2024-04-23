/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Either<E, A> {
  getValue(): A;
  fold<B>(_onLeft: (error: E) => B, onRight: (value: A) => B): B;
  getLeft(): E;
}

export class Left<E> implements Either<E, never> {
  constructor(private error: E) {}

  getValue(): never {
    throw new Error('No such element');
  }

  getLeft(): E {
    return this.error;
  }

  fold<B>(_onLeft: (error: E) => B, _onRight: (value: never) => B): B {
    return _onLeft(this.error);
  }
}

export class Right<A> implements Either<never, A> {
  constructor(private value: A) {}

  flatMap<U>(fn: (value: A) => Either<never, U>): Either<never, U> {
    return fn(this.value);
  }

  getValue(): A {
    return this.value;
  }

  getLeft(): never {
    throw new Error('No such element');
  }

  fold<B>(_onLeft: (error: never) => B, onRight: (value: A) => B): B {
    return onRight(this.value);
  }
}
