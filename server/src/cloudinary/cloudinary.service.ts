import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

import { getDataUri } from '../common/utils/data-uri';

@Injectable()
export class CloudinaryService {
  private readonly ROOT_FOLDER = 'CodeMaven';
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadImage(file: Express.Multer.File, folder: string) {
    const fileUri = getDataUri(file);

    const result = await this.cloudinary.uploader.upload(fileUri.content!, {
      folder: `${this.ROOT_FOLDER}/${folder}`,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }
  async deleteImage(publicId: string) {
    console.log('Public Id- ', publicId);
    await this.cloudinary.uploader.destroy(publicId);
  }
}
