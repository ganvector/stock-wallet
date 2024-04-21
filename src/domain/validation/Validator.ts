import { ValidationHandler } from './ValidationHandler.interface';

export abstract class Validator {
  private readonly handler: ValidationHandler;

  protected constructor(handler: ValidationHandler) {
    this.handler = handler;
  }

  public abstract validate();

  public getHandler(): ValidationHandler {
    return this.handler;
  }
}
