import { defineField, defineType } from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'network',
      title: 'Network',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Pinterest', value: 'pinterest' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      network: 'network',
      url: 'url',
      enabled: 'enabled',
    },
    prepare({ network, url, enabled }) {
      return {
        title: network ? network.charAt(0).toUpperCase() + network.slice(1) : 'Social Link',
        subtitle: enabled ? url : `${url} (disabled)`,
      }
    },
  },
})