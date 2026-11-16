import type { EventCardFields } from '@/components/event-card/event-card.props';

/** Sample field values in the shape Experience Edge returns in the layout JSON. */
export const eventCardMockFields: EventCardFields = {
  Title: { value: 'Night Safari Members’ Evening' },
  StartDate: { value: '2026-12-05T11:00:00Z' },
  EndDate: { value: '2026-12-05T14:00:00Z' },
  Venue: { value: 'Main entrance plaza' },
  Summary: {
    value: '<p>An after-hours walk with our keepers, followed by light refreshments.</p>',
  },
  RegistrationLink: {
    value: { href: '/events/members-evening/register', text: 'Register now', linktype: 'internal' },
  },
};

/** Rendering parameters as they arrive when ShowTime is ticked. */
export const eventCardMockParams = { ShowTime: '1' };
