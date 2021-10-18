import { BadGatewayException, BadRequestException, ForbiddenException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Result, ErrorResult } from "../functional";
import { BodyResponse } from "./body.response";
import { ResponseBuilder } from "./response-builder.response";

export class ResultMapper {
    public static toApiBodyResponse<T>(resultOrError: Result<T>, successMessage?: string): BodyResponse<T> {
        if (resultOrError.isFailure) {
            const errorResult = resultOrError as ErrorResult<T>;
            if (!errorResult.statusCode) {
                return new ResponseBuilder<T>()
                    .withMessage(resultOrError.error.toString())
                    .toJson();
            }
            const errorMessage = resultOrError.error.toString();
            switch (errorResult.statusCode) {
                case HttpStatus.BAD_GATEWAY:
                    throw new BadGatewayException(errorMessage);
                case HttpStatus.BAD_REQUEST:
                    throw new BadRequestException(errorMessage);
                case HttpStatus.FORBIDDEN:
                    throw new ForbiddenException(errorMessage);
                case HttpStatus.NOT_FOUND:
                    throw new NotFoundException(errorMessage);
                case HttpStatus.INTERNAL_SERVER_ERROR:
                    throw new InternalServerErrorException();
            }
        }

        return new ResponseBuilder<T>()
            .onSuccess()
            .withData(resultOrError.getValue())
            .withMessage(successMessage)
            .toJson();
    }
}