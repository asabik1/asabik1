import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessesController } from './controllers/businesses.controller';
import { BusinessSector } from './entity/business-sector.entity';
import { BusinessSubsector } from './entity/business-subsector.entity';
import { Business } from './entity/business.entity';
import { BusinessSectorService } from './services/business-sector.service';
import { BusinessSubsectorService } from './services/business-subsector.service';
import { BusinessService } from './services/business.service';
import { BusinessRepository } from './repository/businesses.repository';
import { BusinessSectorRepository } from './repository/business-sector.repository';
import { BusinessSubsectorRepository } from './repository/business-subsector.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business]),
    TypeOrmModule.forFeature([BusinessSector]),
    TypeOrmModule.forFeature([BusinessSubsector]),
  ],
  providers: [
    BusinessService,
    BusinessRepository,
    BusinessSectorService,
    BusinessSectorRepository,
    BusinessSubsectorService,
    BusinessSubsectorRepository,
  ],
  controllers: [BusinessesController],
  exports: [
    BusinessService,
    BusinessRepository,
    BusinessSectorService,
    BusinessSectorRepository,
    BusinessSubsectorService,
    BusinessSubsectorRepository,
  ],
})
export class BusinessModule {}
