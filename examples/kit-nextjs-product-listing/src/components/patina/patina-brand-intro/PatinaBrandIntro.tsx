import type { JSX } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { CompatibleLink } from '@/components/content-sdk/CompatibleLink';
import type { PatinaBrandIntroProps, PatinaImageCardItem } from './patina-brand-intro.props';

// `family-name:` hint keeps these through cn()/tailwind-merge.
const serif = "font-[family-name:'Cormorant_Garamond','Cormorant',Georgia,'Times_New_Roman',serif]";
const sans = "font-[family-name:'Gill_Sans','Gill_Sans_MT','Cabin',Calibri,sans-serif]";

const ImageCard = ({
  item,
  isEditing,
  index,
}: {
  item: PatinaImageCardItem;
  isEditing: boolean;
  index: number;
}): JSX.Element => {
  const { image, caption, link } = item.fields;
  const hasLink = !isEditing && Boolean(link?.value?.href);

  const media = (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px] bg-neutral-200">
      <ImageWrapper
        image={image}
        wrapperClass="absolute inset-0"
        className={cn(
          'h-full w-full object-cover',
          hasLink && 'transition-transform duration-700 ease-out group-hover:scale-[1.03]'
        )}
        sizes="(min-width: 640px) 33vw, 100vw"
        loading={index === 0 ? 'eager' : 'lazy'}
      />
    </div>
  );

  const text = (
    <Text
      tag="p"
      field={caption}
      className={cn(
        serif,
        'mt-4 text-[1.375rem] font-normal leading-[1.2] tracking-[-0.03em] text-[#333] sm:text-2xl'
      )}
    />
  );

  return (
    <li className="min-w-0">
      {hasLink && link ? (
        <CompatibleLink field={link} className="group block focus-visible:outline-offset-4">
          {media}
          {text}
        </CompatibleLink>
      ) : (
        <>
          {media}
          {text}
        </>
      )}
    </li>
  );
};

/**
 * PatinaBrandIntro
 * Centred intro (label, serif heading, serif paragraph, uppercase text link)
 * followed by a row of portrait image cards with captions, modelled on the
 * "A luxurious change of pace and place" section of patinahotels.com.
 */
export const Default = (props: PatinaBrandIntroProps): JSX.Element => {
  const { fields, params, page } = props;
  const isEditing = page?.mode?.isEditing ?? false;

  if (!fields) {
    return <NoDataFallback componentName="PatinaBrandIntro" />;
  }

  const { label, heading, body, ctaLink, cards } = fields;
  const items = (cards ?? []).filter((item) => item?.fields);
  const showCta = Boolean(ctaLink) && (isEditing || Boolean(ctaLink?.value?.href));

  return (
    <section
      data-component="PatinaBrandIntro"
      id={params?.RenderingIdentifier}
      className={cn(
        'component patina-brand-intro w-full bg-white py-20 text-[#333] sm:py-28',
        params?.styles
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        {/* Intro */}
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          {(label?.value || isEditing) && label && (
            <Text
              tag="p"
              field={label}
              className={cn(sans, 'text-base leading-[1.3] tracking-[0.006em]')}
            />
          )}
          <Text
            tag="h2"
            field={heading}
            className={cn(
              serif,
              'mt-4 text-balance text-[2.4rem] font-normal normal-case leading-[1.15] tracking-[-0.03em] lg:text-[3.5rem] lg:leading-[1.1]'
            )}
          />
          {(body?.value || isEditing) && body && (
            <Text
              tag="p"
              field={body}
              className={cn(
                serif,
                'mt-8 max-w-[600px] text-pretty text-[1.375rem] leading-[1.2] tracking-[-0.03em] sm:text-2xl'
              )}
            />
          )}
          {showCta && ctaLink && (
            <CompatibleLink
              field={ctaLink}
              className={cn(
                sans,
                'relative mt-10 inline-block text-[0.9rem] uppercase leading-none tracking-[0.15em] text-[#333]',
                'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4'
              )}
            />
          )}
        </div>

        {/* Cards */}
        {items.length > 0 && (
          <ul className="m-0 mt-16 grid list-none grid-cols-1 gap-x-6 gap-y-12 p-0 sm:mt-24 sm:grid-cols-3">
            {items.map((item, i) => (
              <ImageCard key={item.id} item={item} isEditing={isEditing} index={i} />
            ))}
          </ul>
        )}
        {items.length === 0 && isEditing && (
          <p className="is-empty-hint mt-16 text-center">
            PatinaBrandIntro: select image cards in the &quot;cards&quot; field.
          </p>
        )}
      </div>
    </section>
  );
};
