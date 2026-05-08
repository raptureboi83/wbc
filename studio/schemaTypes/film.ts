import { defineField, defineType } from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
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
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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