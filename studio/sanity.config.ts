import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
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
      structure: (S) =>
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

            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() || '')
            ),
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