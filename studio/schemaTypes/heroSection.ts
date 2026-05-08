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
      description: 'Text shown on the reel button. If Reel Button URL is empty, the button will be hidden.',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Reel Button URL',
      type: 'url',
      description: 'Optional. Leave blank to hide the reel button.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
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