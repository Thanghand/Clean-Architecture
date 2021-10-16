import { HttpStatus } from '@nestjs/common';
import { Result } from './result';

export class ErrorResult<T> extends Result<T> {

  protected constructor(
    error?: string | Error,
    public readonly statusCode?: HttpStatus,
  ) {
    super(false, error, null);
  }

  public static errorCode<U>(
    error: string | Error,
    statusCode: HttpStatus,
  ): Result<U> {
    error = typeof error == 'string' ? new Error(error) : error;
    return new ErrorResult<U>(error, statusCode);
  }
}
