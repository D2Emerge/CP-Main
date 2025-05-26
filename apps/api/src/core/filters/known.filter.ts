/* eslint-disable @typescript-eslint/no-unsafe-return */
import {KnownException} from '@core/exceptions';
import {FailureResponse} from '@core/shared/response';
import {BaseResponse} from '@core/shared/response/base.response';
import {ArgumentsHost, Catch, ExceptionFilter, Logger} from '@nestjs/common';
import {Response} from 'express';

@Catch(KnownException)
class KnownExceptionFilter implements ExceptionFilter {
  /**
   * Logger instance
   */
  private readonly l = new Logger(KnownExceptionFilter.name, {
    timestamp: true,
  });

  /**
   * Catch known exception
   */
  public catch(
    exception: KnownException,
    host: ArgumentsHost
  ): Response<BaseResponse> {
    const res = host.switchToHttp().getResponse<Response>();

    this.l.debug(`Caught known exception - [${exception.message}]`);

    /**
     * Send known error
     */
    const failureException = new FailureResponse(
      exception.message,
      exception.status,
      exception.code,
      exception.errors
    );

    return res.status(failureException.status).send(failureException);
  }
}

export {KnownExceptionFilter};
