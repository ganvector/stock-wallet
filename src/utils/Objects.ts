interface WithEquals {
  equals(other: any): boolean;
}

export abstract class Objects {
  /**
   * The function checks if two objects are equal by comparing their references or
   * using their custom `equals` method.
   * @param {T} a - The parameter `a` is of type `T`, which extends the interface
   * `WithEquals`. This means that `a` must be a type that has an `equals` method
   * defined, as specified by the `WithEquals` interface.
   * @param {T} b - The parameter `b` is of type `T`, which extends the interface
   * `WithEquals`. This means that `b` must be an object that implements the
   * `equals` method defined in the `WithEquals` interface.
   * @returns The method `equals` is returning a boolean value, which indicates
   * whether the two objects `a` and `b` are equal. The equality check is performed
   * by first checking if `a` and `b` are the same object reference (`a === b`),
   * and if not, it checks if both `a` and `b` are not null and then calls the
   * `equals` method
   */
  public static equals<T extends WithEquals>(a: T, b: T): boolean {
    return a === b || (a !== null && b !== null && a.equals(b));
  }

  /**
   * The hash function takes in multiple values, calculates their hash codes, and
   * returns the XOR result of all non-null hash codes.
   * @param {any[]} values - The `hash` function takes in a variable number of
   * arguments (values) of any type. It then calculates a hash value by performing
   * a bitwise XOR operation on the hash codes of the non-null values in the
   * arguments. If a value is null, it uses 0 as its hash code.
   * @returns The `hash` function is returning a number that is the result of
   * bitwise XOR operation on the hash codes of the values passed as arguments. If
   * a value is not null, its hash code is used in the XOR operation, otherwise, 0
   * is used.
   */
  public static hash(...values: any[]): number {
    return values.reduce(
      (acc, val) => acc ^ (val !== null ? val.hashCode() : 0),
      0,
    );
  }

  /**
   * The function isNull checks if a given object is null and returns a boolean
   * value accordingly.
   * @param {any} obj - The parameter `obj` is of type `any`, which means it can be
   * any data type in TypeScript. The `isNull` function checks if the `obj`
   * parameter is equal to `null` and returns a boolean value.
   * @returns The function is checking if the input `obj` is equal to `null` and
   * returning a boolean value indicating whether it is `true` or `false`.
   */
  public static isNull(obj: any): boolean {
    return obj === null;
  }

  /**
   * The function isUndefined checks if a given object is undefined and returns a
   * boolean value.
   * @param {any} obj - The `obj` parameter in the `isUndefined` function is of
   * type `any`, which means it can be any data type (e.g., number, string, object,
   * etc.). The function checks if the `obj` is equal to `undefined` and returns a
   * boolean value indicating whether it
   * @returns The function `isUndefined` is checking if the input `obj` is equal to
   * `undefined` and returning a boolean value. If `obj` is equal to `undefined`,
   * the function will return `true`, otherwise it will return `false`.
   */
  public static isUndefined(obj: any): boolean {
    return obj === undefined;
  }

  /**
   * The function `requireNonNull` ensures that an object reference is not null and
   * throws an error with a specified message if it is.
   * @param {T} obj - The `obj` parameter is of type `T`, which means it can be any
   * type specified when the method is called. It represents the object reference
   * that is being checked for null.
   * @param {string} [message=Object reference must not be null] - The `message`
   * parameter is a string that provides a custom error message to be thrown if the
   * object reference is null. It is optional and has a default value of "Object
   * reference must not be null".
   * @returns The `obj` variable is being returned.
   */
  public static requireNonNull<T>(
    obj: T,
    message: string = 'Object reference must not be null',
  ): T {
    if (obj === null) {
      throw new Error(message);
    }
    return obj;
  }

  /**
   * The function `toString` returns a string representation of an object, or
   * "null" if the object is null.
   * @param {any} obj - The `obj` parameter in the `toString` function is of type
   * `any`, which means it can be any data type in TypeScript. The function checks
   * if the `obj` is not `null` and then calls the `toString` method on it. If
   * `obj` is `null`,
   * @returns The `toString` method is being returned, which converts the object to
   * a string representation. If the object is `null`, then the string "null" is
   * returned.
   */
  public static toString(obj: any): string {
    return obj !== null ? obj.toString() : 'null';
  }

  /**
   * The `deepEquals` function in TypeScript compares two objects deeply to check
   * if they are equal.
   * @param {any} a - The `a` parameter in the `deepEquals` function is the first
   * object or value that you want to compare for deep equality with another object
   * or value.
   * @param {any} b - The parameter `b` in the `deepEquals` function is the second
   * object that you want to compare for deep equality with the first object `a`.
   * @returns The `deepEquals` function is returning a boolean value, either `true`
   * if the objects `a` and `b` are deeply equal, or `false` if they are not deeply
   * equal.
   */
  public static deepEquals(a: any, b: any): boolean {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key) || !Objects.deepEquals(a[key], b[key]))
        return false;
    }
    return true;
  }

  /**
   * The function `compare` in TypeScript takes two values of type T and a
   * comparator function, and returns the result of applying the comparator
   * function to the two values.
   * @param {T} a - `a` is the first value of type `T` that will be compared.
   * @param {T} b - The `b` parameter is of type `T`, which is a generic type that
   * can represent any data type. It is used as one of the inputs for comparison in
   * the `compare` function.
   * @param comparator - The `comparator` parameter is a function that takes two
   * arguments of type `T` and returns a number. This function is used to compare
   * the two values `a` and `b` of type `T` and determine their order. The
   * `compare` function then returns the result of calling
   * @returns The `compare` function is returning the result of calling the
   * `comparator` function with the arguments `a` and `b`. The `comparator`
   * function is expected to return a number, which is then returned by the
   * `compare` function.
   */
  public static compare<T>(
    a: T,
    b: T,
    comparator: (a: T, b: T) => number,
  ): number {
    return comparator(a, b);
  }

  /**
   * The function `requireNonNullElse` returns the original object if it is not
   * null, otherwise it returns a default object.
   * @param {T} obj - The `obj` parameter is the object that you want to check for
   * null. If `obj` is not null, the method will return `obj`; otherwise, it will
   * return the `defaultObj` parameter.
   * @param {T} defaultObj - The `defaultObj` parameter in the `requireNonNullElse`
   * function is the object that will be returned if the `obj` parameter is `null`.
   * @returns The `requireNonNullElse` function returns the input object `obj` if
   * it is not null, otherwise it returns the default object `defaultObj`.
   */
  public static requireNonNullElse<T>(obj: T, defaultObj: T): T {
    return obj !== null ? obj : defaultObj;
  }
}
