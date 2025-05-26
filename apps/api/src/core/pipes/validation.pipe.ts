/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {KnownException} from '@core/exceptions';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';

@Injectable()
class GlobalDtoPipe implements PipeTransform {
  /**
   * Private logger
   */
  private readonly l = new Logger(GlobalDtoPipe.name, {timestamp: true});

  /**
   * Transform to validate
   */
  public async transform<V = unknown>(
    value: V,
    meta: ArgumentMetadata
  ): Promise<V> {
    this.l.verbose(
      `Validating type - [${meta.type + (meta.data ? ':' + meta.data : '')}]`
    );

    if (['string', 'number'].includes(typeof value)) {
      return value;
    }

    const object = plainToClass(meta.metatype, value);

    const errors = await this.validate(object as Record<string, string>);

    if (errors.length) {
      this.l.warn(`Validation error, length - [${errors.length}]`);

      throw new KnownException(
        'Validation error',
        HttpStatus.UNPROCESSABLE_ENTITY,
        2000,
        errors
      );
    }

    this.l.verbose('Validation ok');

    return value;
  }

  /**
   * Validate object
   */
  private async validate(
    value: object
  ): Promise<Array<{[key: string]: string}>> {
    const errors = await validate(value);

    const constraints = errors.map(error => error.constraints);
    return constraints;
  }
}

export {GlobalDtoPipe};
