import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main background image for the hero section',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Paragraphs',
      type: 'array',
      description: 'Add one paragraph per box so formatting stays clean on the frontend.',
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
              text: 'text',
            },
            prepare({ text }) {
              return {
                title: text ? text.slice(0, 60) : 'Empty paragraph',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})