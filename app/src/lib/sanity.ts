import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'lfktn6lq',
  dataset: 'production',
  apiVersion: '2026-05-06',
  useCdn: false,
})