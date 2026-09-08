import React from 'react';
import {
  Field, ImageField, LinkField,
  Text, RichText, NextImage, Link,
} from '@sitecore-content-sdk/nextjs';
 
interface Fields {
  EyebrowText: Field<string>;
  Title: Field<string>;
  Summary: Field<string>;
  Image: ImageField;
  CtaLink: LinkField;
}
 
type OfferCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};
 
export const Default = (props: OfferCardProps): React.ReactElement => {
  const containerStyles = props.params?.styles ?? '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
 
  if (!props.fields) {
    return (
      <div className="component offer-card">
        [Offer Card] No datasource has been selected.
      </div>
    );
  }
 
  return (
    <div
      className={`component offer-card ${styles}`}
      id={props.params.RenderingIdentifier}
    >
      <div data-class-change className={containerStyles}>
        <NextImage field={props.fields.Image} width={640} height={360} />
        <Text tag="span" className="offer-card__eyebrow" field={props.fields.EyebrowText} />
        <Text tag="h3" className="offer-card__title" field={props.fields.Title} />
        <RichText className="offer-card__summary" field={props.fields.Summary} />
        <Link field={props.fields.CtaLink} className="offer-card__cta btn btn-primary" />
      </div>
    </div>
  );
};
