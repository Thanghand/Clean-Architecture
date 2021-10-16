import { HttpStatus } from '@nestjs/common';
import { ErrorResult } from '../functional/error-result';

export namespace ApiError {
    export class NotFoundError<T> extends ErrorResult<T> {
        constructor(error: string | Error) {
            super(error, HttpStatus.NOT_FOUND);
        }
    }

    export class BadRequestError<T> extends ErrorResult<T> {
        constructor(error: string | Error) {
            super(error, HttpStatus.BAD_REQUEST);
        }
    }

    export class BadGatewayError<T> extends ErrorResult<T> {
        constructor(error: string | Error) {
            super(error, HttpStatus.BAD_GATEWAY);
        }
    }

    export class UnauthorizedError<T> extends ErrorResult<T> {
        constructor(error: string | Error) {
            super(error, HttpStatus.UNAUTHORIZED);
        }
    }

    export class InternalServerError<T> extends ErrorResult<T> {
        constructor(error: string | Error) {
            super(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
