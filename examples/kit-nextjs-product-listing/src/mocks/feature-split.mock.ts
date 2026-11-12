import type { FeatureSplitFields } from '@/components/feature-split/feature-split.props';

/**
 * Sample field values in the same shape Experience Edge returns in the layout JSON.
 * Use for unit tests or local previews before the component is wired to SitecoreAI.
 */
export const featureSplitMockFields: FeatureSplitFields = {
  Heading: { value: 'Plan your visit in minutes' },
  Body: {
    value: '<p>Check opening hours, book tickets and see what is on today, all from one page.</p>',
  },
  Image: {
    value: {
      src: '/images/feature-split-sample.jpg',
      alt: 'Visitors at the entrance',
      width: 1200,
      height: 800,
    },
  },
  Link: {
    value: {
      href: '/plan-your-visit',
      text: 'Plan your visit',
      linktype: 'internal',
    },
  },
};
