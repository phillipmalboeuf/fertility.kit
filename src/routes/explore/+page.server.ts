import { error } from '@sveltejs/kit'
import { isTypeGallery, type TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": 'explore' }),
  ])

  if (!pages?.items.length) {
    error(404, 'Not Found')
  }

  const page = pages.items[0]

  return {
    page: url.searchParams.get('tag')
      ? {
        ...page,
        fields: {
          ...page.fields,
          content: page.fields.content.map(i => isTypeGallery(i) ? {
            ...i,
            fields: {
              ...i.fields,
              content: i.fields.content.filter(item => item.metadata.tags.find(t => t.sys.id === url.searchParams.get('tag')))
            }
          } : i)
        }
      } : page,
    tag: url.searchParams.get('tag'),
    format: url.searchParams.get('format')
  }
})