import type { JSX } from 'react';
import {
  Text,
  RichText,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { Button } from '@/components/ui/button';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { FeatureSplitProps } from './feature-split.props';

type ImageSide = 'left' | 'right';

/**
 * FeatureSplit: an image beside a heading, body text and an optional call-to-action link.
 *
 * Each named export is a headless variant. The export name must match the variant
 * item name under Presentation > Headless Variants > FeatureSplit in SitecoreAI.
 */
const FeatureSplitLayout = ({
  props,
  imageSide,
}: {
  props: FeatureSplitProps;
  imageSide: ImageSide;
}): JSX.Element => {
  const { fields, params, page } = props;

  if (!fields) {
    return <NoDataFallback componentName="FeatureSplit" />;
  }

  const isEditing = page?.mode?.isEditing ?? false;

  // Outside editing, hide empty optional parts so the published page has no gaps.
  // In Page builder, always render them so authors can fill them in.
  const showImage = isEditing || Boolean(fields.Image?.value?.src);
  const showLink = isEditing || Boolean(fields.Link?.value?.href);

  const sectionClasses = [
    'component',
    'feature-split',
    'w-full',
    'py-16',
    'md:py-24',
    params?.styles,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} id={params?.RenderingIdentifier || undefined}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
        {showImage && (
          <div className={imageSide === 'right' ? 'md:order-2' : undefined}>
            <ContentSdkImage
              field={fields.Image}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        )}

        <div
          className={
            showImage ? 'flex flex-col gap-6' : 'flex max-w-3xl flex-col gap-6 md:col-span-2'
          }
        >
          <Text
            tag="h2"
            field={fields.Heading}
            className="font-heading text-3xl font-normal leading-tight tracking-tight text-pretty md:text-5xl"
          />
          <RichText
            field={fields.Body}
            className="text-lg leading-relaxed [&_a]:underline [&_p:not(:last-child)]:mb-4"
          />
          {showLink && fields.Link && (
            <div>
              <Button asChild>
                <ContentSdkLink field={fields.Link} editable={isEditing} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/** Variant "Default": image on the left. */
export const Default = (props: FeatureSplitProps): JSX.Element => (
  <FeatureSplitLayout props={props} imageSide="left" />
);

/** Variant "ImageRight": image on the right. */
export const ImageRight = (props: FeatureSplitProps): JSX.Element => (
  <FeatureSplitLayout props={props} imageSide="right" />
);
