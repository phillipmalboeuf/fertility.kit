import { error } from '@sveltejs/kit'
import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": params.page }),
  ])

  if (!pages?.items.length) {
    error(404, 'Not Found')
  }

  return {
    page: pages.items[0],
    tag: url.searchParams.get('tag'),
    format: url.searchParams.get('format')
  }
})