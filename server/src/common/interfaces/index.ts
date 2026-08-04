import { RowDataPacket } from 'mysql2';

export interface Admin extends RowDataPacket {
  id: string;
  email: string | null;
  password: string | null;
  created_at: Date;
  updated_at: Date;
}

//  About starts here

export interface MissionSection extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;

  section_image: string | null;
  public_id: string | null;

  stat_value: string | null;
  stat_label: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface MissionParagraph extends RowDataPacket {
  id: string;

  paragraph: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface WorkProcessSection extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  heading: string | null;
  description: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface WorkProcessSectionStep extends RowDataPacket {
  id: string;

  title: string | null;
  description: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface AboutHero extends RowDataPacket {
  id: string;

  eyebrow_text: string | null;
  headline_1: string | null;
  headline_2: string | null;
  description: string | null;

  primary_button_text: string | null;
  primary_button_url: string | null;

  secondary_button_text: string | null;
  secondary_button_url: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface StatCounter extends RowDataPacket {
  id: string;

  label: string | null;
  label_value: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface HighlightCard extends RowDataPacket {
  id: string;

  icon: string | null;
  public_id: string | null;

  title: string | null;
  subtitle: string | null;

  created_at: Date;
  updated_at: Date;
}

//  About ends here

// Home section starts here
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

export interface Statistic extends RowDataPacket {
  id: string;

  label: string;
  label_value: number;

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
  status: boolean | null;
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

// Home section ends here
