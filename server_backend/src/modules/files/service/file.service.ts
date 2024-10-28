import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import File from '../entity/file.entity';
import { Readable } from 'stream';
import { Response } from 'express';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  uploadFile(dataBuffer: Buffer, filename: string, uuid?: string) {
    const newFile = this.fileRepository.create({
      filename,
      data: dataBuffer,
      id: uuid,
    });

    return from(this.fileRepository.save(newFile));
  }

  getFile(id: string): Observable<File> {
    return from(
      this.fileRepository.findOne({ where: { id }, select: ['data'] }),
    ).pipe(
      catchError(() => {
        throw new HttpException('File was not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  getFileById(id: string, response: Response): Observable<StreamableFile> {
    return this.getFile(id).pipe(
      map((file: File) => {
        const stream = Readable.from(file.data);
        response.set({
          'Content-Disposition': `inline; filename="${file.filename}"`,
          'Content-Type': 'image',
        });
        return new StreamableFile(stream);
      }),
    );
  }

  deleteFile(id: string): Observable<DeleteResult> {
    return from(this.fileRepository.delete(id));
  }
}

export default FileService;
