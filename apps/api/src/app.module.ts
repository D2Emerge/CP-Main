import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {environment} from './environment';
import {TestModuleController} from './test-module/test-module.controller';
import {RedisModule} from './core/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(environment.env_config),
    TypeOrmModule.forRoot(environment.db_config()),
    RedisModule,
  ],
  controllers: [TestModuleController],
  providers: [],
})
export class AppModule {}
