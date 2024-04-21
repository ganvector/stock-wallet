export class Teste {
  private readonly secret: number = 40;

  public check(aTry: number): boolean {
    return aTry === this.secret;
  }
}

export class ClassMate {
  constructor(
    private readonly name: string,
    private readonly age: number,
  ) {}
}
