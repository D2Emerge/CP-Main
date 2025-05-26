import {HttpStatus} from '@nestjs/common';
import {BaseResponse} from './base.response';

class SuccessResponse<V> extends BaseResponse {
  constructor(
    public message: string,
    public status: HttpStatus,
    public code = 0,
    public data: V = <V>{}
  ) {
    super(message, status, code);
  }
}

export {SuccessResponse};
