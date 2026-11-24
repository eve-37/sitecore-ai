import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/**
 * Child item: /sitecore/templates/Project/<Collection>/PatinaImageCard
 * Reusable portrait image card with a caption (and optional link).
 */
export interface PatinaImageCardFields {
  image: ImageField;
  caption: Field<string>;
  link?: LinkField;
}

export interface PatinaImageCardItem {
  id: string;
  name?: string;
  displayName?: string;
  fields: PatinaImageCardFields;
}

/**
 * Parent datasource: /sitecore/templates/Project/<Collection>/PatinaBrandIntro
 */
export interface PatinaBrandIntroFields {
  label?: Field<string>;
  heading: Field<string>;
  body?: Field<string>;
  ctaLink?: LinkField;
  cards?: PatinaImageCardItem[];
}

export interface PatinaBrandIntroProps extends ComponentProps {
  fields: PatinaBrandIntroFields;
}
