import { Entity } from './Entity';
import { Identifier } from './Identifier';

export abstract class AggregationRoot<
  ID extends Identifier,
> extends Entity<ID> {}
