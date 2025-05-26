import {FailureResponse} from '@core/shared/response';
import {HttpStatus} from '@nestjs/common';

class KnownException extends FailureResponse {
  constructor(
    public message: string,
    public status: HttpStatus,
    public code: number,
    public errors: unknown[]
  ) {
    super(message, status, code, errors);
  }
}

export {KnownException};
