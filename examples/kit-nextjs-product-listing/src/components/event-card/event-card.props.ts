import type { Field, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

export type EventCardFields = {
  Title?: Field<string>;
  StartDate?: Field<string>;
  EndDate?: Field<string>;
  Venue?: Field<string>;
  Summary?: RichTextField;
  RegistrationLink?: LinkField;
};

export type EventCardParams = ComponentProps['params'] & {
  ShowTime?: string;
};

export type EventCardProps = Omit<ComponentProps, 'params'> & {
  params: EventCardParams;
  fields?: EventCardFields;
};
