import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/**
 * Field names must match the Sitecore data template
 * /sitecore/templates/Project/<Collection>/PatinaHero2 exactly (case-sensitive).
 */
export interface PatinaHero2Fields {
  heading: Field<string>;
  backgroundImage: ImageField;
  ctaLink?: LinkField;
}

export interface PatinaHero2Props extends ComponentProps {
  fields: PatinaHero2Fields;
}
