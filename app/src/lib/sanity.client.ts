import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'lfktn6lq',
  dataset: 'production',
  apiVersion: '2026-05-07',
  useCdn: true,
})