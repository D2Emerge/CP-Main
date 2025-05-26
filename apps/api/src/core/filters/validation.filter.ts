import {ValidationException} from '@core/exceptions';
import {FailureResponse} from '@core/shared/response';
import {BaseResponse} from '@core/shared/response/base.response';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {Response} from 'express';

@Catch(ValidationException)
class ValidationExceptionFilter implements ExceptionFilter {
  /**
   * Logger instance
   */
  private readonly l = new Logger(ValidationException.name, {
    timestamp: true,
  });
  public catch(
    exception: ValidationException,
    host: ArgumentsHost
  ): Response<BaseResponse> {
    const res = host.switchToHttp().getResponse<Response>();
    this.l.debug(`Caught validation exception - [${exception.message}]`);

    /**
     * Send validation error
     */

    const failureException = new FailureResponse(
      exception.message,
      HttpStatus.BAD_REQUEST,
      2000,
      exception.errors
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.status(failureException.status).send(failureException);
  }
}

export {ValidationExceptionFilter};
