'use client';

import type { JSX } from 'react';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { EventCardProps } from './event-card.props';
import { Text, RichText, DateField, Link as ContentSdkLink } from '@sitecore-content-sdk/nextjs';
import { Button } from '@/components/ui/button';

const SITE_TIME_ZONE = 'UTC';
const SITE_LOCALE = 'en-SG';

const hasDate = (value?: string): boolean => Boolean(value) && !value!.startsWith('0001-01-01');

const formatDate = (date: Date | null, showTime: boolean): string => {
  if (!date) return '';
  return date.toLocaleString(SITE_LOCALE, {
    timeZone: SITE_TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(showTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  });
};

export const Default = (props: EventCardProps): JSX.Element => {
  const { fields, params, page } = props;

  if (!fields) {
    return <NoDataFallback componentName="EventCard" />;
  }

  const isEditing = page?.mode?.isEditing ?? false;
  const showTime = params?.ShowTime === '1';
  const showEndDate = isEditing || hasDate(fields.EndDate?.value);
  const showVenue = isEditing || Boolean(fields.Venue?.value);
  const showLink = isEditing || Boolean(fields.RegistrationLink?.value?.href);

  const sectionClasses = ['component', 'event-card', 'w-full', 'py-12', params?.styles]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} id={params?.RenderingIdentifier || undefined}>
      <article className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border border-current/15 p-8 md:p-10">
        <Text
          tag="h2"
          field={fields.Title}
          className="font-heading text-3xl font-normal leading-tight tracking-tight text-pretty md:text-4xl"
        />

        <dl className="grid gap-4 text-base sm:grid-cols-[auto_1fr] sm:gap-x-8">
          <dt className="font-semibold">When</dt>
          <dd>
            <time dateTime={hasDate(fields.StartDate?.value) ? fields.StartDate?.value : undefined}>
              {fields.StartDate && (
                <DateField field={fields.StartDate} render={(date) => formatDate(date, showTime)} />
              )}
            </time>
            {showEndDate && fields.EndDate && (
              <>
                <span aria-hidden="true"> – </span>
                <span className="sr-only"> to </span>
                <time dateTime={hasDate(fields.EndDate.value) ? fields.EndDate.value : undefined}>
                  <DateField field={fields.EndDate} render={(date) => formatDate(date, showTime)} />
                </time>
              </>
            )}
          </dd>

          {showVenue && (
            <>
              <dt className="font-semibold">Where</dt>
              <Text tag="dd" field={fields.Venue} />
            </>
          )}
        </dl>

        <RichText
          field={fields.Summary}
          className="text-lg leading-relaxed [&_a]:underline [&_p:not(:last-child)]:mb-4"
        />

        {showLink && fields.RegistrationLink && (
          <div>
            <Button asChild>
              <ContentSdkLink field={fields.RegistrationLink} editable={isEditing} />
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};
