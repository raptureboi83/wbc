import { defineArrayMember, defineField, defineType } from 'sanity'

export const packagesSectionType = defineType({
  name: 'packagesSection',
  title: 'Packages Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Packages',
    }),
    defineField({
      name: 'boxes',
      title: 'Boxes',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'packageBox',
          title: 'Package Box',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              price: 'price',
            },
            prepare({ title, price }) {
              return {
                title: title || 'Package Box',
                subtitle: price || 'No price set',
              }
            },
          },
        }),
        defineArrayMember({
          name: 'fullSpanBox',
          title: 'Full Span Box',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: title || 'Full Span Box',
                subtitle: 'Full width box',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Packages Section',
      }
    },
  },
})