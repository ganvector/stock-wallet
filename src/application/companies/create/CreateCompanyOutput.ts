export class CreateCompanyOutput {
  private constructor(public readonly id: string) {}

  public static create(id: string) {
    return new CreateCompanyOutput(id);
  }
}
