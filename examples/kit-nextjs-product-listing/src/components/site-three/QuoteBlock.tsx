import React from 'react';
import { Field, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';

type QuoteBlockProps = {
  params?: { [key: string]: string };
  fields?: {
    Quote?: Field<string>;
    Attribution?: Field<string>;
    Role?: Field<string>;
  };
};

export const Default = (props: QuoteBlockProps): React.ReactElement => {
  const containerStyles = props.params?.styles ?? '';
  const grid = props.params?.GridParameters ?? '';

  return (
    <section className={`container-default component ${grid} ${containerStyles}`.trim()}>
      <div data-class-change className={containerStyles} />
      <blockquote className="component-content">
        <ContentSdkText tag="p" field={props.fields?.Quote} />
        <footer>
          <ContentSdkText tag="cite" field={props.fields?.Attribution} />
          <ContentSdkText tag="span" field={props.fields?.Role} />
        </footer>
      </blockquote>
    </section>
  );
};