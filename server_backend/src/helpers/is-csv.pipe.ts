import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { fileSignaturesConst } from './file-signatures';

@Injectable()
export class IsCsvPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let isInvalid = true;

    const allowedFileExtensions = ['csv'];
    const csvSignatures = fileSignaturesConst.filter((x) =>
      allowedFileExtensions.includes(x.extension[0]),
    );

    csvSignatures.some((signature) => {
      const signatureMimeType = signature.mimeType.mime.toString();
      const fileMimeType = value.mimetype.toString();

      if (signatureMimeType === fileMimeType) {
        isInvalid = false;
      }
    });

    if (isInvalid) {
      throw new HttpException(
        'Invalid file extension. Only *.csv files are allowed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
