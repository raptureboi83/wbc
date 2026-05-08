import { defineField, defineType } from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Couple Name / Film Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'string',
      description: 'Example: September 14, 2025',
    }),
    defineField({
      name: 'location',
      title: 'Venue / Location',
      type: 'string',
      description: 'Example: Barrie, Ontario or Belcroft Estate',
    }),
    defineField({
      name: 'blurb',
      title: 'Paragraph / Description',
      type: 'text',
      rows: 4,
      description: 'Short paragraph shown with the film.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Hosted Video URL',
      type: 'url',
      description: 'Direct URL to your self-hosted video file, like an mp4 on your own domain.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'poster',
      title: 'Thumbnail / Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the thumbnail image for accessibility.',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      subtitle: 'location',
    },
  },
})