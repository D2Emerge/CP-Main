import {Controller, Get} from '@nestjs/common';

@Controller()
export class TestModuleController {
  @Get()
  getTest(): string {
    return 'test!';
  }
}
