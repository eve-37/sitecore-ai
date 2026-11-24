import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/**
 * Field names must match the Sitecore data template
 * /sitecore/templates/Project/<Collection>/PatinaHero exactly (case-sensitive).
 */
export interface PatinaHeroFields {
  /** Optional small label above the heading (shown by the Banner variant). */
  label?: Field<string>;
  heading: Field<string>;
  backgroundImage: ImageField;
  ctaLink?: LinkField;
}

export interface PatinaHeroProps extends ComponentProps {
  fields: PatinaHeroFields;
}
