import type { StatHighlightsFields } from '@/components/stat-highlights/stat-highlights.props';

/**
 * Sample field values in the same shape Experience Edge returns in the layout JSON.
 * Treelist fields arrive as an array of items, each with its own fields.
 */
export const statHighlightsMockFields: StatHighlightsFields = {
  Heading: { value: 'A year in numbers' },
  Intro: { value: 'What our community achieved together in 2026.' },
  Stats: [
    {
      id: 'stat-1',
      name: 'Visitors',
      fields: { Value: { value: '1,200,000+' }, Label: { value: 'Visitors welcomed' } },
    },
    {
      id: 'stat-2',
      name: 'Rating',
      fields: { Value: { value: '4.8' }, Label: { value: 'Average visitor rating' } },
    },
    {
      id: 'stat-3',
      name: 'Satisfaction',
      fields: { Value: { value: '98%' }, Label: { value: 'Would recommend us' } },
    },
    {
      id: 'stat-4',
      name: 'Programmes',
      fields: { Value: { value: '350' }, Label: { value: 'Education programmes run' } },
    },
  ],
};
