import type { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';

/** A page as returned by the `NavPage` fragment in the Component GraphQL Query. */
export interface HeaderNavPage {
  id: string;
  name: string;
  displayName?: string;
  title?: { jsonValue?: Field<string> };
  navigationTitle?: { jsonValue?: Field<string> };
  url?: { href?: string };
}

/** The page picked in the datasource's "Root Page" droptree, plus its child pages. */
export interface HeaderNavRootPage extends HeaderNavPage {
  children?: { results?: HeaderNavPage[] };
}

/**
 * Shape of the HeaderNav datasource item
 * (/sitecore/templates/Project/patinahotel/HeaderNav).
 */
export interface HeaderNavDatasource {
  logo?: { jsonValue?: ImageField };
  rootPage?: { targetItem?: HeaderNavRootPage | null };
}

export interface HeaderNavFields {
  data?: {
    datasource?: HeaderNavDatasource | null;
  };
}

export type HeaderNavProps = ComponentProps & {
  fields?: HeaderNavFields;
};
