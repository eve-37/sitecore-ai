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
        <ContentSdkText tag="p" className="text-2xl leading-snug" field={props.fields?.Quote} />
        <footer className="mt-4 flex flex-col">
            <ContentSdkText tag="cite" className="not-italic font-semibold" field={props.fields?.Attribution} />
            <ContentSdkText tag="span" className="text-sm opacity-70" field={props.fields?.Role} />
        </footer>
        </blockquote>
    </section>
  );
};