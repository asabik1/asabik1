import { Module } from '@nestjs/common';
import { GuestService } from './services/guest.service';
import { GuestController } from './controllers/guest.controller';

@Module({
  providers: [GuestService],
  controllers: [GuestController],
  exports: [GuestService],
})
export class GuestModule {}
