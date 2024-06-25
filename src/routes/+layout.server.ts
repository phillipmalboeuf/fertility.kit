
import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Tag } from 'contentful'

export const load = async ({ request, cookies }) => {

  const [navigation, tags] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', select: ['sys.id', 'fields.id', 'fields.links'], include: 2, "fields.id": "navigation", locale: 'en-US' }),
    content.getTags()
  ])

  return {
    navigation: navigation.items[0],
    tags: tags.items.reduce((ts, tag) => {
      return {
        ...ts,
        [tag.sys.id]: tag
      }
    }, {} as {[id: string]: Tag})
  }
}