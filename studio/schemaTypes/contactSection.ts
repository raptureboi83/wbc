import { defineField, defineType } from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact & Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'basedIn',
      title: 'Based In',
      type: 'string',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Email About Your Date',
    }),
    defineField({
      name: 'helperText',
      title: 'Helper Text',
      type: 'text',
      rows: 3,
      initialValue:
        'Include your wedding date, venue, and anything you already know about timing. You can also email directly if you prefer.',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright',
      type: 'string',
      initialValue: '© Copyright 2025, WeddingsByChristian',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact & Footer',
      }
    },
  },
})