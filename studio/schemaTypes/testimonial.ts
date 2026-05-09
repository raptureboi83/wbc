import { defineField, defineType } from 'sanity'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    orderRankField({ type: 'testimonial' }),

    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Role or Date',
      type: 'string',
      description: 'Example: Bride, Groom, or September 2024',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first',
      hidden: true,
      readOnly: true,
    }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: {
      title: 'name',
      subtitle: 'quote',
      role: 'role',
    },
    prepare({ title, subtitle, role }) {
      const parts = [role, subtitle ? subtitle.slice(0, 80) : 'No quote yet'].filter(Boolean)

      return {
        title: title || 'Untitled testimonial',
        subtitle: parts.join(' • '),
      }
    },
  },
})