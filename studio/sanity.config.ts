import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './schemaTypes'

const singletonTypes = new Set([
  'heroSection',
  'aboutSection',
  'contactSection',
  'siteSettings',
])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'weddings-by-christian',
  title: 'Weddings By Christian',
  projectId: 'lfktn6lq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero')
              .id('heroSection')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),

            S.listItem()
              .title('About')
              .id('aboutSection')
              .child(
                S.document()
                  .schemaType('aboutSection')
                  .documentId('aboutSection')
              ),

            S.listItem()
              .title('Contact & Footer')
              .id('contactSection')
              .child(
                S.document()
                  .schemaType('contactSection')
                  .documentId('contactSection')
              ),

            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            S.divider(),

            orderableDocumentListDeskItem({
              type: 'film',
              title: 'Films',
              S,
              context,
            }),

            orderableDocumentListDeskItem({
              type: 'testimonial',
              title: 'Testimonials',
              S,
              context,
            }),

            orderableDocumentListDeskItem({
              type: 'vendorCategory',
              title: 'Vendor Categories',
              S,
              context,
            }),

            ...S.documentTypeListItems().filter((listItem) => {
              const id = listItem.getId() || ''
              return (
                !singletonTypes.has(id) &&
                id !== 'film' &&
                id !== 'testimonial' &&
                id !== 'vendorCategory'
              )
            }),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})