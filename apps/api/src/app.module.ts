import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {environment} from './environment';
import {TestModuleController} from './test-module/test-module.controller';

@Module({
  imports: [
    ConfigModule.forRoot(environment.env_config),
    TypeOrmModule.forRoot(environment.db_config()),
  ],
  controllers: [TestModuleController],
  providers: [],
})
export class AppModule {}
