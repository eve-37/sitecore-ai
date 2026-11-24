import type { JSX } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { CompatibleLink } from '@/components/content-sdk/CompatibleLink';
import type { PatinaHeroProps } from './patina-hero.props';

// Patina uses Cormorant (headings) and Gill Sans (UI text). No build-time font download:
// these stacks use the fonts if the site loads them, otherwise elegant system fallbacks.
const headingFont =
  "font-[family-name:'Cormorant_Garamond','Cormorant',Georgia,'Times_New_Roman',serif]";
const uiFont = "font-[family-name:'Gill_Sans','Gill_Sans_MT','Cabin',Calibri,sans-serif]";

const CircleArrowIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
  >
    <circle cx="12" cy="12" r="11" />
    <path d="M10 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Variant = 'hero' | 'banner';

/**
 * Shared full-bleed image + centred text layout.
 * - hero:   page-top hero (h1, large uppercase heading, circled-arrow CTA, eager image)
 * - banner: mid-page banner (label, h2 sentence-case heading, plain CTA, lazy image)
 */
const PatinaHeroBase = ({
  props,
  variant,
}: {
  props: PatinaHeroProps;
  variant: Variant;
}): JSX.Element => {
  const { fields, params, page } = props;
  const isEditing = page?.mode?.isEditing ?? false;

  if (!fields) {
    return <NoDataFallback componentName="PatinaHero" />;
  }

  const { label, heading, backgroundImage, ctaLink } = fields;
  const isHero = variant === 'hero';
  const hasCta = Boolean(ctaLink) && (isEditing || Boolean(ctaLink?.value?.href));
  const showLabel = !isHero && Boolean(label) && (isEditing || Boolean(label?.value));

  return (
    <section
      data-component="PatinaHero"
      data-variant={variant}
      id={params?.RenderingIdentifier}
      className={cn(
        'component patina-hero relative isolate flex w-full items-center justify-center overflow-hidden bg-neutral-900 text-white',
        isEditing ? 'min-h-[640px]' : 'h-[100svh] min-h-[560px]',
        params?.styles
      )}
    >
      {/* Static background image */}
      <ImageWrapper
        image={backgroundImage}
        wrapperClass="absolute inset-0 -z-20"
        className="h-full w-full object-cover"
        sizes="100vw"
        priority={isHero}
        loading={isHero ? 'eager' : 'lazy'}
        fetchPriority={isHero ? 'high' : 'auto'}
      />

      {/* Subtle scrim so white text stays legible on bright photography */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          isHero ? 'bg-black/10' : 'bg-black/20'
        )}
      />
      {isHero && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent"
        />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center px-6 text-center">
        {showLabel && label && (
          <Text tag="p" field={label} className={cn(uiFont, 'mb-4 text-base leading-[1.3]')} />
        )}

        <Text
          tag={isHero ? 'h1' : 'h2'}
          field={heading}
          className={cn(
            headingFont,
            isHero
              ? cn(
                  'max-w-[12ch] text-balance text-[3.25rem] font-normal uppercase leading-[1.1] tracking-[-0.03em]',
                  'sm:text-[4.5rem] lg:text-[6.25rem]',
                  'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000'
                )
              : 'max-w-[640px] text-balance text-[2.4rem] font-normal normal-case leading-[1.15] tracking-[-0.03em] lg:text-[3.25rem] lg:leading-[1.1]'
          )}
        />

        {hasCta && ctaLink && (
          <div
            className={cn(
              isHero
                ? 'mt-8 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:delay-300 motion-safe:fill-mode-both'
                : 'mt-10'
            )}
          >
            <CompatibleLink
              field={ctaLink}
              showLinkTextWithChildrenPresent
              className={cn(
                uiFont,
                'group relative inline-flex items-center gap-3 uppercase text-white',
                isHero ? 'text-[15px] tracking-[0.15em]' : 'text-[0.9rem] tracking-[0.15em]',
                'after:absolute after:-bottom-1 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                isHero ? 'after:w-[calc(100%-2rem)]' : 'after:w-full',
                'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white'
              )}
            >
              {isHero ? <CircleArrowIcon /> : null}
            </CompatibleLink>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * PatinaHero
 * Default: full-viewport static image hero with a large centred serif heading and an
 * understated uppercase CTA, modelled on the patinahotels.com homepage hero
 * (without the video carousel).
 */
export const Default = (props: PatinaHeroProps): JSX.Element => (
  <PatinaHeroBase props={props} variant="hero" />
);

/**
 * Banner: mid-page full-bleed image section with a small label, a sentence-case
 * serif heading and a plain uppercase link (e.g. "Lifestyle Programming").
 */
export const Banner = (props: PatinaHeroProps): JSX.Element => (
  <PatinaHeroBase props={props} variant="banner" />
);
