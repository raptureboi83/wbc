import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main hero heading. You can use line breaks in the text if needed.',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Small label above the main hero heading.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Background image shown behind the hero section.',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Reel Button Label',
      type: 'string',
      initialValue: 'Watch Our Reel',
      validation: (Rule) => Rule.required(),
      description: 'Text shown on the reel button.',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Reel Button URL',
      type: 'url',
      initialValue: 'https://weddingsbychristians.com',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
      description: 'Full URL for the reel button destination.',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subtext',
      media: 'backgroundImage',
    },
  },
})