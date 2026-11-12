import type { Field, Item } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/** Fields on each Stat item (template: Stat). */
export type StatFields = {
  Value?: Field<string>;
  Label?: Field<string>;
};

/** A Stat item as it appears inside a Treelist field in the layout JSON. */
export type StatItem = Omit<Item, 'fields'> & {
  fields: StatFields;
};

/**
 * Fields on the StatHighlights datasource (template: StatHighlights).
 * Names must match the data template field names exactly (case-sensitive).
 */
export type StatHighlightsFields = {
  Heading?: Field<string>;
  Intro?: Field<string>;
  Stats?: StatItem[];
};

export type StatHighlightsProps = ComponentProps & {
  fields?: StatHighlightsFields;
};
