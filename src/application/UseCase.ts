export abstract class UseCase<IN, OUT> {
  abstract execute(input: IN): OUT;
}
