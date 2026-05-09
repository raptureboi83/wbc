import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'lfktn6lq',
  dataset: 'production',
  apiVersion: '2026-05-08',
  useCdn: false,
})

export const client = sanityClient