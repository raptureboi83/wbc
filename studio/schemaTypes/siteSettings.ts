import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Used when navbar branding is set to text.',
    }),
    defineField({
      name: 'brandingMode',
      title: 'Navbar Branding',
      type: 'string',
      initialValue: 'text',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Logo Image', value: 'logo' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.brandingMode !== 'logo',
      description: 'Shown in the navbar when branding is set to Logo Image.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
      description: 'Add, enable, disable, and reorder social links.',
    }),
  ],
})