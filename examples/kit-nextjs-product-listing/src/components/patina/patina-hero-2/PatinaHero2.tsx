import type { JSX } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { CompatibleLink } from '@/components/content-sdk/CompatibleLink';
import type { PatinaHero2Props } from './patina-hero-2.props';

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

/**
 * PatinaHero2
 * Full-viewport static image hero with a centred serif heading and an
 * understated uppercase CTA, modelled on the patinahotels.com homepage hero
 * (without the video carousel).
 */
export const Default = (props: PatinaHero2Props): JSX.Element => {
  const { fields, params, page } = props;
  const isEditing = page?.mode?.isEditing ?? false;

  if (!fields) {
    return <NoDataFallback componentName="PatinaHero2" />;
  }

  const { heading, backgroundImage, ctaLink } = fields;
  const hasCta = Boolean(ctaLink) && (isEditing || Boolean(ctaLink?.value?.href));

  return (
    <section
      data-component="PatinaHero2"
      id={params?.RenderingIdentifier}
      className={cn(
        'component patina-hero-2 relative isolate flex w-full items-center justify-center overflow-hidden bg-neutral-900 text-white',
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
        priority={true}
        loading="eager"
        fetchPriority="high"
      />

      {/* Subtle scrim so white text stays legible on bright photography */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-black/10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center px-6 text-center">
        <Text
          tag="h1"
          field={heading}
          className={cn(
            headingFont,
            'max-w-[12ch] text-balance text-[3.25rem] font-normal uppercase leading-[1.1] tracking-[-0.03em]',
            'sm:text-[4.5rem] lg:text-[6.25rem]',
            'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000'
          )}
        />

        {hasCta && ctaLink && (
          <div className="mt-8 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:delay-300 motion-safe:fill-mode-both">
            <CompatibleLink
              field={ctaLink}
              showLinkTextWithChildrenPresent
              className={cn(
                uiFont,
                'group relative inline-flex items-center gap-3 text-[15px] uppercase tracking-[0.15em] text-white',
                'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-[calc(100%-2rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white'
              )}
            >
              <CircleArrowIcon />
            </CompatibleLink>
          </div>
        )}
      </div>
    </section>
  );
};
