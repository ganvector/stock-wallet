export class CreateCompanyCommand {
  private constructor(
    public readonly name: string,
    public readonly cnpj: string,
  ) {}

  public static create(name: string, cnpj: string) {
    return new CreateCompanyCommand(name, cnpj);
  }
}
