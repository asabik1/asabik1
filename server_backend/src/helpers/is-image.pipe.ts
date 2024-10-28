import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { fileSignaturesConst } from './file-signatures';

@Injectable()
export class IsImagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let isInvalid: boolean = true;

    const allowedFileExtensions = ['jpg', 'png', 'jpeg'];
    const imageSignatures = fileSignaturesConst.filter((x) =>
      allowedFileExtensions.includes(x.extension[0]),
    );

    imageSignatures.forEach((signature) => {
      const signatureBuffer = Buffer.from(signature.byteSeq);
      const fileBuffer = value.buffer.slice(0, signature.byteSeq.length);

      if (signatureBuffer.toString() == fileBuffer.toString()) {
        isInvalid = false;
      }
    });

    if (isInvalid) {
      throw new HttpException('Invalid file extension', HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
