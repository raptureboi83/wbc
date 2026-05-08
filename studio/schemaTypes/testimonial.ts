import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
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
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'quote',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled testimonial',
        subtitle: subtitle ? subtitle.slice(0, 80) : 'No quote yet',
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})