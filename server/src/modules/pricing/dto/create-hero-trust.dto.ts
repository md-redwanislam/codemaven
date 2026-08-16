import { IsString } from 'class-validator';

export class CreatePricingTrustDto {
  @IsString()
  label!: string;

  @IsString()
  display_order!: string;
}
