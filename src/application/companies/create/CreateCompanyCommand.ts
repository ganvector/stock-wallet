export class CreateCompanyCommand {
  private constructor(
    public readonly name: string,
    public readonly cnpj: string | number,
  ) {}

  public static create(name: string, cnpj: number) {
    return new CreateCompanyCommand(name, cnpj);
  }
}
