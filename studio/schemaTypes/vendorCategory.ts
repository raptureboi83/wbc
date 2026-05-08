import { defineField, defineType } from 'sanity'

export const vendorCategory = defineType({
  name: 'vendorCategory',
  title: 'Vendor Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first',
    }),
    defineField({
      name: 'vendors',
      title: 'Vendors',
      type: 'array',
      of: [
        defineField({
          name: 'vendor',
          title: 'Vendor',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Vendor Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'website',
              title: 'Website',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'website',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled vendor',
                subtitle: subtitle || 'No website added',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'vendors',
    },
    prepare({ title, subtitle }) {
      const count = Array.isArray(subtitle) ? subtitle.length : 0
      return {
        title: title || 'Untitled category',
        subtitle: `${count} vendor${count === 1 ? '' : 's'}`,
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