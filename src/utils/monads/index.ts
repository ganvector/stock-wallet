import { Either, Left, Right } from './Either';

export abstract class MonadsAPI {
  public static Left<E, A>(error: E): Either<E, A> {
    return new Left(error);
  }

  public static Right<E, A>(value: A): Either<E, A> {
    return new Right(value);
  }
}
