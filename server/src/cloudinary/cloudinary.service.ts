import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

import { getDataUri } from '../common/utils/data-uri';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const fileUri = getDataUri(file);

    const result = await this.cloudinary.uploader.upload(fileUri.content!, {
      folder: 'CodeMaven/hero',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async deleteImage(publicId: string) {
    await this.cloudinary.uploader.destroy(publicId);
  }
}
