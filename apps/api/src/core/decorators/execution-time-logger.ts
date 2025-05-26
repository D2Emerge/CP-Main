import {Logger} from '@nestjs/common';

export const LogExecutionTime = <T>(
  _: T,
  name: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: []) {
    const start = Date.now();
    const result = await originalMethod.apply(this, args);
    const end = Date.now();
    Logger.verbose(`Method: ${name} - Execution Time: ${end - start}ms`);
    return result;
  };

  return descriptor;
};
