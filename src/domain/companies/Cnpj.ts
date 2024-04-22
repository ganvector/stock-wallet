import { ValueObject } from '../ValueObjects';

export class Cnpj extends ValueObject {
  private value: string;

  private constructor(cnpj: string) {
    super();
    this.value = cnpj;
  }

  static from(aCnpj: string | number) {
    return new Cnpj(aCnpj.toString().replace(/\D/g, ''));
  }

  private getValue() {
    return this.value;
  }

  private getMaskedValue() {
    return this.value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5',
    );
  }

  public isValid() {
    const cnpj = this.value;
    if (!cnpj) return false;
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }
    let calculatedCnpj = cnpj.substr(0, 12);
    calculatedCnpj += this.calculateDigit(calculatedCnpj);
    calculatedCnpj += this.calculateDigit(calculatedCnpj);
    return calculatedCnpj.substr(-2) === cnpj.substr(-2);
  }

  private calculateDigit(numbers: string): number {
    let index = 2;
    const sum = [...numbers].reverse().reduce((acc, aNumber) => {
      acc += Number(aNumber) * index;
      index = index === 9 ? 2 : index + 1;
      return acc;
    }, 0);
    const mod = sum % 11;

    return mod < 2 ? 0 : 11 - mod;
  }
}
