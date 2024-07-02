import { error } from '@sveltejs/kit'
import { isTypeGallery, type TypePageSkeleton, type TypePlaylistSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'

import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  
  const [texts, playlists, pages] = await Promise.all([
    content.getEntries<TypeTextSkeleton>({ content_type: "text", include: 2, "fields.id": params.id }),
    content.getEntries<TypePlaylistSkeleton>({ content_type: "playlist", include: 2, "fields.id": params.id }),
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 3, "fields.id": 'explore' }),
  ])

  if (!pages?.items.length || (!texts?.items.length && !playlists?.items.length)) {
    return error(404, 'Not Found')
  }

  const page = pages.items[0]

  return {
    page,
    text: texts?.items.length ? texts.items[0] : undefined,
    playlist: playlists?.items.length ? playlists.items[0] : undefined,
    tag: url.searchParams.get('tag'),
    format: url.searchParams.get('format')
  }
})