import { RowDataPacket } from 'mysql2';

export interface Admin extends RowDataPacket {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface HeroSection extends RowDataPacket {
  id: string;

  headline_1: string;
  headline_2: string;
  description: string;

  primary_button_text: string;
  primary_button_url: string;

  secondary_button_text: string;
  secondary_button_url: string;

  ratings: string | null;
  rating_text: string | null;
  trust_text: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface CTA extends RowDataPacket {
  id: string;

  heading: string;
  description: string;

  primary_button_text: string;
  primary_button_url: string;

  secondary_button_text: string;
  secondary_button_url: string;

  created_at: Date;
  updated_at: Date;
}

export interface FAQ extends RowDataPacket {
  id: string;

  eyebrow_text: string;
  heading: string;
  subtext: string;

  button_text: string;
  button_url: string;

  created_at: Date;
  updated_at: Date;
}

export interface ChooseUs extends RowDataPacket {
  id: string;

  eyebrow_text: string;
  heading: string;
  subtext: string;

  button_text: string;
  button_url: string;

  created_at: Date;
  updated_at: Date;
}

export interface SolutionsSection extends RowDataPacket {
  id: string;

  eyebrow_text: string;
  heading: string;

  created_at: Date;
  updated_at: Date;
}

export interface ServiceSection extends RowDataPacket {
  id: string;

  eyebrow_text: string;
  heading: string;

  created_at: Date;
  updated_at: Date;
}

export interface LogoSection extends RowDataPacket {
  id: string;

  eyebrow_text: string;

  created_at: Date;
  updated_at: Date;
}

export interface ContactSection extends RowDataPacket {
  id: string;

  eyebrow_text: string;
  heading: string;
  description: string;

  created_at: Date;
  updated_at: Date;
}
