import { RowDataPacket } from 'mysql2';

export interface Admin extends RowDataPacket {
  id: string;
  email: string | null;
  password: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface HeroSection extends RowDataPacket {
  id: string;

  headline_1: string | null;
  headline_2: string | null;
  description: string | null;

  primary_button_text: string | null;
  primary_button_url: string | null;

  secondary_button_text: string | null;
  secondary_button_url: string | null;

  ratings: string | null;
  rating_text: string | null;
  trust_text: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface CTA extends RowDataPacket {
  id: string;

  heading: string | null;
  description: string | null;

  primary_button_text: string | null;
  primary_button_url: string | null;

  secondary_button_text: string | null;
  secondary_button_url: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface FAQ extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;
  subtext: string | null;

  button_text: string | null;
  button_url: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface Add_FAQ extends RowDataPacket {
  id: string;

  question: string | null;
  answer: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ChooseUs extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;
  subtext: string | null;

  button_text: string | null;
  button_url: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ChooseUsReason extends RowDataPacket {
  id: string;
  icon: string | null;
  public_id: string | null;
  title: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IndustryCard extends RowDataPacket {
  id: string;
  icon: string | null;
  public_id: string | null;
  title: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface SolutionsSection extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ServiceSection extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ServiceCard extends RowDataPacket {
  id: string;
  icon: string | null;
  public_id: string | null;
  title: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface LogoSection extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface AddLogo extends RowDataPacket {
  id: string;
  logo: string | null;
  public_id: string | null;
  name: string | null;
  status: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ContactSection extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;
  description: string | null;

  created_at: Date;
  updated_at: Date;
}
