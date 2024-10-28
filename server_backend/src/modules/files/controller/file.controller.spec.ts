import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from '../service/file.service';
import { Observable, of } from 'rxjs';
import { Response } from 'express';

class FileServiceMock {
  getFileById(
    id: string,
    response: Response,
  ): Observable<{ path: string; response: Response }> {
    return of({ path: 'mocked/path/to/file', response });
  }
}
describe('FileController', () => {
  let controller: FileController;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useClass: FileServiceMock,
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
    fileService = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFileById', () => {
    it('should return a StreamableFile', async () => {
      const fileId = 'mocked-file-id';
      const responseMock: Response = {} as Response;

      const result = await controller.getFileById(fileId, responseMock);

      expect(result).toBeDefined();
    });
  });
});
