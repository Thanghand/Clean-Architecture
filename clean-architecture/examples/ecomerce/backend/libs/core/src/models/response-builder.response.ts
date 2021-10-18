import { BodyResponse } from "./body.response";


export class ResponseBuilder<T> {

    constructor(private readonly bodyResponse: BodyResponse<T> = {}) {
    }

    withStatusCode(value: number): ResponseBuilder<T> {
        const bodyResponse = {
            data: this.bodyResponse.data,
            statusCode: value,
            message: this.bodyResponse.message
        }
        return new ResponseBuilder<T>(bodyResponse);
    }

    withMessage(value: string): ResponseBuilder<T> {
        const bodyResponse = {
            data: this.bodyResponse.data,
            statusCode: this.bodyResponse.statusCode,
            message: value
        }
        return new ResponseBuilder<T>(bodyResponse);
    }

    withData(value: any): ResponseBuilder<T> {
        const bodyResponse = {
            data: value,
            statusCode: this.bodyResponse.statusCode,
            message: this.bodyResponse.message
        }
        return new ResponseBuilder<T>(bodyResponse);
    }

    onSuccess(statusCode: number = 200) {
        const bodyResponse = {
            data: this.bodyResponse.data,
            statusCode: statusCode,
            message: this.bodyResponse.message
        }
        return new ResponseBuilder<T>(bodyResponse);
    }

    onError(statusCode: number = 500) {
        const bodyResponse = {
            data: this.bodyResponse.data,
            statusCode: statusCode,
            message: this.bodyResponse.message
        }
        return new ResponseBuilder<T>(bodyResponse);
    }

    toJson() {
        const { statusCode, message, data } = this.bodyResponse;
        if (data) {
            return {
                message: message ?? 'Execute successfully',
                data: data,
                statusCode
            }
        }
        return {
            message: message ?? 'Execute successfully',
            statusCode
        }
    }
}