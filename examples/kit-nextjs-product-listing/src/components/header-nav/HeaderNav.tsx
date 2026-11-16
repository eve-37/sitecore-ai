import type { JSX } from 'react';
import NextLink from 'next/link';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { HeaderNavPage, HeaderNavProps } from './header-nav.props';

/**
 * Variants:
 *  - Default      -> root page link (e.g. "Home") followed by its child pages
 *  - ChildrenOnly -> child pages only
 */

const getLabel = (page: HeaderNavPage): string =>
  page.navigationTitle?.jsonValue?.value ||
  page.title?.jsonValue?.value ||
  page.displayName ||
  page.name;

const NavItem = ({ page }: { page: HeaderNavPage }): JSX.Element => (
  <li className="header-nav__item">
    <NextLink
      href={page.url?.href || '/'}
      prefetch={false}
      className="header-nav__link inline-block px-3 py-2 font-medium hover:underline"
    >
      {getLabel(page)}
    </NextLink>
  </li>
);

const HeaderNavBase = ({
  props,
  includeRoot,
}: {
  props: HeaderNavProps;
  includeRoot: boolean;
}): JSX.Element => {
  const { fields, params } = props;
  const root = fields?.data?.datasource;

  if (!root) {
    return <NoDataFallback componentName="HeaderNav" />;
  }

  const children = root.children?.results ?? [];

  return (
    <nav
      className={`component header-nav ${params?.styles ?? ''}`.trim()}
      id={params?.RenderingIdentifier || undefined}
      aria-label="Main"
    >
      <ul className="header-nav__list m-0 flex list-none flex-wrap items-center gap-2 p-0">
        {includeRoot && <NavItem page={root} />}
        {children.map((child) => (
          <NavItem key={child.id} page={child} />
        ))}
      </ul>
    </nav>
  );
};

export const Default = (props: HeaderNavProps): JSX.Element => (
  <HeaderNavBase props={props} includeRoot={true} />
);

export const ChildrenOnly = (props: HeaderNavProps): JSX.Element => (
  <HeaderNavBase props={props} includeRoot={false} />
);
