import {HttpStatus} from '@nestjs/common';

class BaseResponse {
  constructor(
    public message: string,
    public status: HttpStatus,
    public code: number
  ) {}
}

export {BaseResponse};
