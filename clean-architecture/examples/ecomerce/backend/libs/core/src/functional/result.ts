export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string | Error;
  private _value: T;

  public constructor(isSuccess: boolean, error?: string | Error, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
  }

  public getValue(): T {
    if (this.isFailure) {
      // throw new Error(this.error?.toString() ?? 'Can't get the value of an error result. Use 'errorValue' instead.')
      throw this.error;
    }

    return this._value;
  }

  // public errorValue(): T {
  //     return this.error as T;
  // }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string | Error): Result<U> {
    error = typeof error == 'string' ? new Error(error) : error;
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }

  public static combineArray<U>(results: Result<U>[]): Result<U[]> {
    const combineResults: U[] = [];
    for (const result of results) {
      if (result.isFailure) return Result.fail(result.error);
      combineResults.push(result.getValue());
    }
    return Result.ok<U[]>(combineResults);
  }
}
