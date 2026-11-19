import type { JSX } from 'react';
import NextLink from 'next/link';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import type { HeaderNavPage, HeaderNavProps } from './header-nav.props';

/**
 * HeaderNav
 *
 * Datasource: a "HeaderNav" item (Templates/Project/patinahotel/HeaderNav) with
 * - Logo (Image) -> brand logo, links to the root page
 * - Root Page (Droptree) -> the page whose children make up the menu
 *
 * Variants:
 * - Default -> root page link (e.g. "Home") followed by its child pages
 * - ChildrenOnly -> child pages only
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
  const datasource = fields?.data?.datasource;

  if (!datasource) {
    return <NoDataFallback componentName="HeaderNav" />;
  }

  const logo = datasource.logo?.jsonValue;
  const root = datasource.rootPage?.targetItem ?? null;
  const children = root?.children?.results ?? [];
  const homeHref = root?.url?.href || '/';
  const homeLabel = root ? getLabel(root) : 'Home';

  return (
    <nav
      className={`component header-nav mx-auto mt-6 flex w-full flex-wrap items-center justify-center gap-4 ${params?.styles ?? ''}`.trim()}
      id={params?.RenderingIdentifier || undefined}
      aria-label="Main"
    >
      {/* ImageWrapper renders nothing on the live site when the field is empty,
          and shows the empty-field placeholder in Page builder. */}
      {logo && (
        <NextLink
          href={homeHref}
          prefetch={false}
          className="header-nav__logo inline-flex shrink-0 items-center"
          aria-label={homeLabel}
        >
          <ImageWrapper
            image={logo}
            alt={(logo.value?.alt as string) || homeLabel}
            className="h-10 w-auto object-contain"
            wrapperClass="h-10"
            priority
          />
        </NextLink>
      )}

      {root && (
        <ul className="header-nav__list m-0 flex list-none flex-wrap items-center justify-center gap-2 p-0">
          {includeRoot && <NavItem page={root} />}
          {children.map((child) => (
            <NavItem key={child.id} page={child} />
          ))}
        </ul>
      )}
    </nav>
  );
};

export const Default = (props: HeaderNavProps): JSX.Element => (
  <HeaderNavBase props={props} includeRoot={true} />
);

export const ChildrenOnly = (props: HeaderNavProps): JSX.Element => (
  <HeaderNavBase props={props} includeRoot={false} />
);
