import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from '../service/file.service';
import { Observable } from 'rxjs';

@Controller('files')
@ApiTags('files')
@UseInterceptors(ClassSerializerInterceptor)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async getFileById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Observable<StreamableFile>> {
    return this.fileService.getFileById(id, response);
  }
}
