import { Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import type { Field } from '@sitecore-content-sdk/nextjs';

interface TitleAndTextProps {
  params?: { [key: string]: string };
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
  };
}

export const Default = (props: TitleAndTextProps) => {
  return (
    <section className={`py-8 ${props?.params?.styles || ''}`} data-class-change>
      <ContentSdkText tag="h2" className="text-3xl font-bold" field={props.fields?.Title} />
      <ContentSdkText tag="p" className="mt-4" field={props.fields?.Text} />
    </section>
  );
};