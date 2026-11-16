import { ComponentProps } from '@/lib/component-props';
import { GqlFieldString } from '@/types/gql.props';

/**
 * HeaderNav: lists a root page (the rendering data source, e.g. Home) and its child pages.
 * Data comes from the "Component GraphQL Query" on the HeaderNav Json Rendering item.
 */
export type HeaderNavPage = {
  id: string;
  name: string;
  displayName?: string;
  title?: GqlFieldString | null;
  navigationTitle?: GqlFieldString | null;
  url?: { href?: string } | null;
};

export type HeaderNavRoot = HeaderNavPage & {
  children?: {
    results?: HeaderNavPage[];
  } | null;
};

export type HeaderNavFields = {
  fields?: {
    data?: {
      datasource?: HeaderNavRoot | null;
    };
  };
};

export type HeaderNavProps = ComponentProps & HeaderNavFields;
