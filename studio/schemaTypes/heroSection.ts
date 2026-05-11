import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Text shown on the CTA button (e.g., "Watch Our Reel")',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      description: 'Link destination. Use # anchors like #films or full URLs.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main background image for the hero section. Used as fallback if video is set.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Hero Background Video (Optional)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: `⚠️ OPTIONAL. Use only if you want motion instead of a static image.

✅ DO:
• Keep it 6–12 seconds max, looped
• Use muted, compressed MP4 or WebM
• Keep file size under 3MB (smaller is better)
• Use subtle atmospheric clips (slow motion, no dialogue)

❌ DON'T:
• Upload 4K or uncompressed video
• Use files over 5MB
• Include audio or dialogue-dependent content
• Use fast cuts or distracting motion

The background image above will show as the poster/fallback.`,
    }),
  ],
})