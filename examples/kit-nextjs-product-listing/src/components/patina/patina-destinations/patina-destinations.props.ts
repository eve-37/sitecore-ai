import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/**
 * Child item: /sitecore/templates/Project/<Collection>/PatinaDestination
 * Field names are case-sensitive and must match the template.
 */
export interface PatinaDestinationFields {
  tabLabel: Field<string>;
  heading: Field<string>;
  backgroundImage: ImageField;
  ctaLink?: LinkField;
}

/** A Treelist-selected item as returned by the layout service. */
export interface PatinaDestinationItem {
  id: string;
  name?: string;
  displayName?: string;
  fields: PatinaDestinationFields;
}

/**
 * Parent datasource: /sitecore/templates/Project/<Collection>/PatinaDestinations
 */
export interface PatinaDestinationsFields {
  label?: Field<string>;
  destinations?: PatinaDestinationItem[];
}

export interface PatinaDestinationsProps extends ComponentProps {
  fields: PatinaDestinationsFields;
}
