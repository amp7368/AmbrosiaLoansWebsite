import { AmbrosiaException } from '@api/io-model';
import { EmptyObject } from '@appleptr16/utilities';
import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export class ExceptionFactory {
    static instance: ExceptionFactory;
    exception(
        message: string,
        status: Exclude<StatusCodes, StatusCodes.ACCEPTED>,
        extra?: EmptyObject
    ) {
        const response: AmbrosiaException = {
            message,
            status,
            isOk: false,
            ...extra,
        };
        throw new HttpException(response, status);
    }

    forbidden(message: string) {
        this.exception(message, StatusCodes.FORBIDDEN);
    }

    unauthorized(message: string) {
        this.exception(message, StatusCodes.UNAUTHORIZED);
    }

    conflict(message: string) {
        this.exception(message, StatusCodes.CONFLICT);
    }

    badRequest(request: unknown) {
        this.exception(
            'Invalid request structure',
            StatusCodes.BAD_REQUEST,
            request
        );
    }
    badSession() {
        this.unauthorized('Invalid session');
    }
    userAlreadyExists() {
        this.conflict('The username is already taken');
    }
    loginBadCredentials() {
        this.unauthorized('The username or password is invalid');
    }
}
ExceptionFactory.instance = new ExceptionFactory();
