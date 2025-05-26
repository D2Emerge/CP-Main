import {HttpStatus} from '@nestjs/common';
import {BaseResponse} from './base.response';

class FailureResponse extends BaseResponse {
  constructor(
    public message: string,
    public status: HttpStatus,
    public code: number,
    public errors: unknown[]
  ) {
    super(message, status, code);
  }
}

export {FailureResponse};
