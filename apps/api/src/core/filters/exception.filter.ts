/* eslint-disable @typescript-eslint/no-unsafe-return */
import {ValidationException} from '@core/exceptions';
import {FailureResponse} from '@core/shared/response';
import {BaseResponse} from '@core/shared/response/base.response';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {Response} from 'express';

@Catch()
class AnyExceptionFilter implements ExceptionFilter {
  /**
   * Logger instance
   */
  private readonly l = new Logger(ValidationException.name, {
    timestamp: true,
  });
  public catch(
    exception: FailureResponse | HttpException | undefined,
    host: ArgumentsHost
  ): Response<BaseResponse> {
    const res = host.switchToHttp().getResponse<Response>();
    this.l.debug(`Caught exception - [${exception.message}]`);

    /**
     * Something wrong happened
     */
    if (typeof exception === 'undefined') {
      const internalError = new FailureResponse(
        'Unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
        1,
        []
      );

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(internalError);
    }

    if (exception instanceof HttpException) {
      const failureException = new FailureResponse(
        exception.message,
        exception.getStatus(),
        1,
        []
      );
      return res.status(failureException.status).send(failureException);
    }

    /**
     * Send known error
     */
    const failureException = new FailureResponse(
      exception.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      1,
      []
    );
    return res.status(failureException.status).send(failureException);
  }
}

export {AnyExceptionFilter};
