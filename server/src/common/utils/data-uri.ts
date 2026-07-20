import DataUriParser from 'datauri/parser';
import path from 'path';

export function getDataUri(file: Express.Multer.File) {
  const parser = new DataUriParser();

  const extension = path.extname(file.originalname);

  return parser.format(extension, file.buffer);
}
