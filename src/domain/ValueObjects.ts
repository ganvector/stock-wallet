export abstract class ValueObject {
  protected abstract value;

  equals(obj: ValueObject) {
    return this.value === obj.value;
  }
}
