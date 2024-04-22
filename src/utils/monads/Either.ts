/* eslint-disable @typescript-eslint/no-unused-vars */
export type Either<E, A> = Left<E> | Right<A>;

export class Left<E> {
  constructor(private error: E) {}

  map<U>(_fn: (value: never) => U): Either<E, never> {
    return this;
  }

  flatMap<U>(_fn: (value: never) => Either<E, U>): Either<E, never> {
    return this;
  }

  getError(): E {
    return this.error;
  }

  fold<B>(_onLeft: (error: E) => B, _onRight: (value: never) => B): B {
    return _onLeft(this.error);
  }
}

export class Right<A> {
  constructor(private value: A) {}

  map<U>(fn: (value: A) => U): Either<never, U> {
    return new Right(fn(this.value));
  }

  flatMap<U>(fn: (value: A) => Either<never, U>): Either<never, U> {
    return fn(this.value);
  }

  getValue(): A {
    return this.value;
  }

  fold<B>(_onLeft: (error: never) => B, onRight: (value: A) => B): B {
    return onRight(this.value);
  }
}
