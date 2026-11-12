import type { Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/**
 * Field names must match the field names on the FeatureSplit data template
 * in SitecoreAI exactly (case-sensitive), because the layout JSON uses them as keys.
 */
export type FeatureSplitFields = {
  Heading?: Field<string>;
  Body?: RichTextField;
  Image?: ImageField;
  Link?: LinkField;
};

export type FeatureSplitProps = ComponentProps & {
  fields?: FeatureSplitFields;
};
