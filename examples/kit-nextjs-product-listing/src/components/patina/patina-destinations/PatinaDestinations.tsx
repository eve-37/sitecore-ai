'use client';

import type { JSX, KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { CompatibleLink } from '@/components/content-sdk/CompatibleLink';
import type { PatinaDestinationItem, PatinaDestinationsProps } from './patina-destinations.props';

// Use the `family-name:` hint so cn()/tailwind-merge never drops these in favour of font-weight classes.
const headingFont =
  "font-[family-name:'Cormorant_Garamond','Cormorant',Georgia,'Times_New_Roman',serif]";
const uiFont = "font-[family-name:'Gill_Sans','Gill_Sans_MT','Cabin',Calibri,sans-serif]";

const EnterIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 20 20"
    className="h-[18px] w-[18px] shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
  >
    <path d="M8 2.5h8.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H8" strokeLinecap="round" />
    <path d="M2.5 10h10M9.5 6.5 13 10l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const getTabText = (item: PatinaDestinationItem): string =>
  item.fields?.tabLabel?.value || item.displayName || item.name || '';

/**
 * PatinaDestinations
 * Full-bleed tabbed destination showcase modelled on the patinahotels.com
 * "Our Destinations" section: static images that cross-fade, a shared label,
 * per-destination heading + CTA, and a frosted pill tab bar with a sliding
 * active indicator.
 */
export const Default = (props: PatinaDestinationsProps): JSX.Element => {
  const { fields, params, page } = props;
  const isEditing = page?.mode?.isEditing ?? false;
  const items = (fields?.destinations ?? []).filter((item) => item?.fields);

  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const baseId = useId();

  const activeIndex = Math.min(active, Math.max(items.length - 1, 0));

  // Keep the white pill under the active tab (on change and on resize).
  const measure = useCallback(() => {
    const el = tabRefs.current[activeIndex];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeIndex]);

  useLayoutEffect(() => {
    measure();
  }, [measure, items.length]);

  useEffect(() => {
    const bar = tabRefs.current[0]?.parentElement;
    if (!bar || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [measure]);

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1;
    if (e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  if (!fields) {
    return <NoDataFallback componentName="PatinaDestinations" />;
  }

  return (
    <section
      data-component="PatinaDestinations"
      id={params?.RenderingIdentifier}
      className={cn(
        'component patina-destinations relative isolate w-full overflow-hidden bg-neutral-900 text-white',
        isEditing ? 'min-h-[640px]' : 'h-[85svh] min-h-[560px]',
        params?.styles
      )}
    >
      {items.length === 0 && (
        <div className="flex min-h-[640px] items-center justify-center p-10 text-center">
          <span className="is-empty-hint">
            PatinaDestinations: select destination items in the &quot;destinations&quot; field.
          </span>
        </div>
      )}

      {/* Slides (stacked, cross-fading) */}
      {items.map((item, i) => {
        const { heading, backgroundImage, ctaLink } = item.fields;
        const isActive = i === activeIndex;
        const showCta = Boolean(ctaLink) && (isEditing || Boolean(ctaLink?.value?.href));

        return (
          <div
            key={item.id}
            id={`${baseId}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${i}`}
            aria-hidden={!isActive}
            inert={!isActive || undefined}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none',
              isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
            )}
          >
            <ImageWrapper
              image={backgroundImage}
              wrapperClass="absolute inset-0 -z-20"
              className="h-full w-full object-cover"
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-black/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-black/25 to-transparent"
            />

            <div className="relative mx-auto flex max-w-[1240px] flex-col items-center px-6 pt-28 text-center sm:pt-36">
              {fields.label && (
                <Text
                  tag="p"
                  field={fields.label}
                  className={cn(uiFont, 'mb-4 text-base leading-none')}
                />
              )}
              <Text
                tag="h2"
                field={heading}
                className={cn(
                  headingFont,
                  'mb-6 max-w-[34ch] text-balance text-[2.25rem] font-normal normal-case leading-[1.1] tracking-[-0.03em] sm:text-[3.25rem] sm:leading-none'
                )}
              />
              {showCta && ctaLink && (
                <CompatibleLink
                  field={ctaLink}
                  showLinkTextWithChildrenPresent
                  className={cn(
                    uiFont,
                    'group relative inline-flex items-center gap-3 px-6 py-4 text-[15px] uppercase leading-none tracking-[0.15em] text-white',
                    'after:absolute after:bottom-3 after:left-6 after:h-px after:w-[calc(100%-4.75rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                    'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white'
                  )}
                >
                  <EnterIcon />
                </CompatibleLink>
              )}
            </div>
          </div>
        );
      })}

      {/* Tab bar */}
      {items.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 sm:bottom-16">
          <div
            role="tablist"
            aria-label={fields.label?.value || 'Destinations'}
            className="relative flex max-w-full overflow-x-auto rounded-full bg-black/30 p-1.5 sm:p-2 backdrop-blur-[24px] [scrollbar-width:none]"
          >
            <span
              aria-hidden="true"
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white sm:top-2 sm:bottom-2 transition-all duration-300 ease-out motion-reduce:transition-none"
              style={{ left: indicator.left, width: indicator.width }}
            />
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${baseId}-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    uiFont,
                    'relative z-10 shrink-0 rounded-full px-3 py-3.5 text-[12px] uppercase leading-none tracking-[0.12em] transition-colors duration-300 sm:px-6 sm:py-4 sm:text-[15px] sm:tracking-[0.15em]',
                    isActive ? 'text-black' : 'text-white hover:text-white/80',
                    'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white'
                  )}
                >
                  {getTabText(item)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
