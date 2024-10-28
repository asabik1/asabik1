import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NotEmptyValidationPipe } from './helpers/not-empty-validation.pipe';

export function mainConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    new NotEmptyValidationPipe(),
  );
}
