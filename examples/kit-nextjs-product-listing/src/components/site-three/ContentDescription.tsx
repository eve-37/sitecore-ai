import React from 'react';
import {
  Field,
  RichTextField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  Heading: Field<string>;
  Description: RichTextField;
}

type ContentDescriptionProps = {
  params?: { [key: string]: string };
  fields?: Fields;
};

const ContentDescriptionDefaultComponent = (props: ContentDescriptionProps): React.ReactElement => (
  <div className={`component content-description ${props.params?.styles ?? ''}`}>
    <div className="component-content">
      <span className="is-empty-hint">Content Description: no datasource assigned.</span>
    </div>
  </div>
);

export const Default = (props: ContentDescriptionProps): React.ReactElement => {
  if (!props.fields) {
    return <ContentDescriptionDefaultComponent {...props} />;
  }

  const containerStyles = props.params?.styles ?? '';
  const grid = props.params?.GridParameters ?? '';
  const id = props.params?.RenderingIdentifier;

  return (
    <section
      className={`component content-description ${grid} ${containerStyles}`.trim()}
      id={id ? id : undefined}
    >
      <div data-class-change className={containerStyles}>
        <div className="component-content">
          <ContentSdkText
            tag="h2"
            className="content-description-heading"
            field={props.fields.Heading}
          />
          <ContentSdkRichText
            className="content-description-body"
            field={props.fields.Description}
          />
        </div>
      </div>
    </section>
  );
};
