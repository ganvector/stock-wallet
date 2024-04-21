import { Objects } from '../utils/Objects';
import { Identifier } from './Identifier';
import { ValidationHandler } from './validation/ValidationHandler.interface';

export abstract class Entity<ID extends Identifier> {
  protected readonly id: ID;

  constructor(id: ID) {
    Objects.requireNonNull(id, '[id] should not be null');
    this.id = id;
  }

  public abstract validate(handler: ValidationHandler): void;

  public getId(): ID {
    return this.id;
  }

  equals(o: unknown): boolean {
    if (this === o) return true;
    if (o == null || this.constructor.name != o.constructor.name) return false;
    const entity: Entity<any> = o as Entity<any>;
    return Objects.equals(this.getId(), entity.getId());
  }

  hashCode(): number {
    return Objects.hash(this.getId());
  }
}
