import { defineField, defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [
        defineField({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
            prepare({ title }) {
              return {
                title: title ? title.slice(0, 80) : 'Paragraph',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About',
      }
    },
  },
})